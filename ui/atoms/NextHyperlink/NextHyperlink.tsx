/* eslint-disable react/jsx-props-no-spreading */
import Link from "next/link"
import { FunctionComponent } from "react"

import Hyperlink, { HyperlinkProps } from "../Hyperlink/Hyperlink"

type NextHyperlinkProps = {
  href: string
  locale?: string
} & HyperlinkProps

const NextHyperlink: FunctionComponent<NextHyperlinkProps> = ({ href, locale, ...rest }: NextHyperlinkProps) => (
  <Link href={href} passHref locale={locale}>
    <Hyperlink {...rest} />
  </Link>
)

export default NextHyperlink
