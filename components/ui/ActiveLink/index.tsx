import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { Children, cloneElement, PropsWithChildren, ReactElement } from 'react';

export interface ActiveLinkProps extends LinkProps {
  activeClassName: string;
  as?: string;
}

const ActiveLink = ({
  children,
  activeClassName,
  ...otherProps
}: PropsWithChildren<ActiveLinkProps>) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = (child as any).props?.className || '';
  const className =
    asPath === otherProps.href || asPath === otherProps.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link {...otherProps}>
      {cloneElement(child as ReactElement, {
        className: className || null,
      })}
    </Link>
  );
};

export default ActiveLink;
