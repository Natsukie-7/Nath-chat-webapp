import { css } from "goober";
import {
  createEffect,
  createUniqueId,
  mergeProps,
  onCleanup,
  splitProps,
  untrack,
  type ComponentProps,
  type JSX,
} from "solid-js";
import { Dynamic, type DynamicProps } from "solid-js/web";
import { useThemeContext } from "./themes.context";

// Exportações do goober
export { css, extractCss, glob, keyframes } from "goober";

// Tipos para as funções
type Predicate = (props: string[]) => string[];

let getForwardProps: Predicate | null = null;

export function shouldForwardProp(
  predicate: (prop: string) => boolean
): Predicate {
  return (props: string[]) => props.filter(predicate);
}

// Configuração do tema
interface ThemeContextType {
  [key: string]: any;
}

// Tipos para o styled component
type StyledComponent<T extends keyof JSX.IntrinsicElements> = ((
  props: ComponentProps<T> & {
    as?: keyof JSX.IntrinsicElements;
    theme?: ThemeContextType;
  }
) => JSX.Element) & {
  class: (props: any) => string;
};

interface StyledFunction {
  <T extends keyof JSX.IntrinsicElements>(tag: T): (
    ...args: any[]
  ) => StyledComponent<T>;
}

interface MakeStyledContext {
  target?: any;
  g?: number;
  p?: any;
}

// Tipo para os argumentos do CSS que aceita tanto template strings quanto objetos
type CSSArgs = [TemplateStringsArray, ...any[]] | [any] | any[];

type GlobalStylesFn = (props: any) => JSX.Element;
type GlobalStylesContent = string | ((props: any) => string);

function makeStyled(
  this: MakeStyledContext | void,
  tag: keyof JSX.IntrinsicElements
) {
  let _ctx: MakeStyledContext = this || {};

  return (...args: CSSArgs) => {
    const StyledElement: StyledComponent<typeof tag> = ((
      props: ComponentProps<typeof tag> & {
        as?: keyof JSX.IntrinsicElements;
        theme?: ThemeContextType;
      }
    ) => {
      const theme = useThemeContext();
      const withTheme = mergeProps(props, { theme });
      const clone = mergeProps(withTheme, {
        get class() {
          const pClass = withTheme.class as string;
          const append = "class" in withTheme && /^go[0-9]+/.test(pClass);

          // Usar any para evitar problemas com a tipagem interna do Goober
          let className = (css as any).apply(
            {
              target: _ctx.target,
              o: append ? 1 : 0,
              p: withTheme,
              g: _ctx.g,
            },
            args
          );
          return [pClass, className].filter(Boolean).join(" ");
        },
      });

      const [local, newProps] = splitProps(clone, ["as", "theme"]);

      const forwardKeys = getForwardProps
        ? getForwardProps(Object.keys(newProps))
        : [];
      const [htmlProps] = splitProps(
        newProps,
        forwardKeys as (keyof typeof newProps)[]
      );

      const createTag = local.as || tag;

      let el: JSX.Element;

      if (typeof createTag === "function") {
        el = (createTag as any)(htmlProps);
      } else {
        if (_ctx.g == 1) {
          // Para global styles, retornamos null
          return null;
        } else {
          el = Dynamic(
            mergeProps({ component: createTag }, htmlProps) as DynamicProps<any>
          );
        }
      }

      return el;
    }) as StyledComponent<typeof tag>;

    // Adicionar propriedade class ao componente
    StyledElement.class = (props: any) => {
      return untrack(() => {
        return (css as any).apply(
          { target: _ctx.target, p: props, g: _ctx.g },
          args
        );
      });
    };

    return StyledElement;
  };
}

export const styled = new Proxy(makeStyled as StyledFunction, {
  get(target, tag: keyof JSX.IntrinsicElements) {
    return target(tag);
  },
}) as StyledFunction & {
  [K in keyof JSX.IntrinsicElements]: (...args: any[]) => StyledComponent<K>;
};

export function createGlobalStyles(
  styles: GlobalStylesContent
): GlobalStylesFn {
  const styleId = `solid-global-styles-${createUniqueId()}`;

  console.log(styleId);

  return function GlobalStyles(props: any = {}) {
    const theme = useThemeContext();

    createEffect(() => {
      const mergedProps = { ...props, theme };

      let cssContent: string;

      if (typeof styles === "function") {
        cssContent = styles(mergedProps);
      } else {
        cssContent = styles;
      }

      let styleElement = document.getElementById(styleId);

      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = styleId;
        styleElement.setAttribute("data-goober", "");
        document.head.appendChild(styleElement);
      }

      styleElement.textContent = cssContent;
    });

    onCleanup(() => {
      const styleElement = document.getElementById(styleId);
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    });

    return null;
  };
}
