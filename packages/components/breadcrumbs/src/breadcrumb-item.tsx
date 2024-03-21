import {forwardRef} from "@tw-material/system";

import {UseBreadcrumbItemProps, useBreadcrumbItem} from "./use-breadcrumb-item";

export interface BreadcrumbItemProps extends UseBreadcrumbItemProps {
  children: React.ReactNode;
}

const Breadcrumbs = forwardRef<"li", BreadcrumbItemProps>((props, ref) => {
  const {
    Component,
    WrapperComponent,
    children,
    isLast,
    separator,
    startContent,
    endContent,
    hideSeparator,
    getBaseProps,
    getItemProps,
    getSeparatorProps,
  } = useBreadcrumbItem({
    ...props,
    ref,
  });

  return (
    <WrapperComponent {...getBaseProps()}>
      <Component {...getItemProps()}>
        {startContent}
        {children}
        {endContent}
      </Component>
      {!isLast && !hideSeparator && <span {...getSeparatorProps()}>{separator}</span>}
    </WrapperComponent>
  );
});

Breadcrumbs.displayName = "Breadcrumbs";

export default Breadcrumbs;
