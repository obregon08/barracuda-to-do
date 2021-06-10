import { NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import ToDoTemplate from "../ui/templates/ToDoTemplate/ToDoTemplate"

type PageProps = {
  locale: any
}

const Index: NextPage = () => <ToDoTemplate />

export const getStaticProps = async ({ locale }: PageProps): Promise<any> => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}

export default Index
