// Libraries
import React from "react"
import {
  Box,
  BoxProps,
  Flex,
  ListItem,
  Text,
  TextProps,
  UnorderedList,
} from "@chakra-ui/react"
import { useIntl } from "react-intl"
import { graphql, PageProps } from "gatsby"
import type { Context } from "../../../types"

// Components
import Breadcrumbs from "../../../components/Breadcrumbs"
import Link from "../../../components/Link"
import Translation from "../../../components/Translation"
import PageMetadata from "../../../components/PageMetadata"

// Utils
import { translateMessageId } from "../../../utils/translations"
import FeedbackCard from "../../../components/FeedbackCard"

const Content = (props: BoxProps) => <Box py={4} px={8} w="full" {...props} />
const ContentHeading = (props: TextProps) => <Text as="h2" {...props} />

const Contributors = ({
  data,
  location,
}: PageProps<Queries.ContributorsPageQuery, Context>) => {
  const intl = useIntl()
  // TODO: Remove specific user checks once Acolad has updated their usernames
  const translatorData =
    data.allTimeData?.data?.flatMap(
      // use flatMap to get cleaner object types withouts nulls
      (item) => {
        const user = item?.user
        if (!user) return []

        const userName = user.username
        if (!userName) return []

        const fullName = user.fullName ?? ""

        return userName !== "ethdotorg" &&
          !userName.includes("LQS_") &&
          !userName.includes("REMOVED_USER") &&
          !userName.includes("Aco_") &&
          !fullName.includes("Aco_") &&
          !userName.includes("Acc_") &&
          !fullName.includes("Acc_") &&
          userName !== "Finnish_Sandberg" &&
          userName !== "Norwegian_Sandberg" &&
          userName !== "Swedish_Sandberg"
          ? [
              {
                user: {
                  username: userName,
                  fullName: fullName,
                },
              },
            ]
          : []
      }
    ) ?? []

  return (
    <Flex direction="column" align="center" w="full">
      <PageMetadata
        title={translateMessageId(
          "page-contributing-translation-program-contributors-meta-title",
          intl
        )}
        description={translateMessageId(
          "page-contributing-translation-program-contributors-meta-description",
          intl
        )}
      />

      <Content>
        <Breadcrumbs slug={location.pathname} />
        <ContentHeading as="h1">
          <Translation id="page-contributing-translation-program-contributors-title" />
        </ContentHeading>
        <ContentHeading as="h4">
          <Text as="strong">
            <Translation id="page-contributing-translation-program-contributors-number-of-contributors" />{" "}
            {translatorData.length}
          </Text>
        </ContentHeading>
        <Text>
          <Translation id="page-contributing-translation-program-contributors-our-translators-1" />
        </Text>
        <Text>
          <Translation id="page-contributing-translation-program-contributors-our-translators-2" />
        </Text>
        <Text>
          <Translation id="page-contributing-translation-program-contributors-our-translators-3" />
        </Text>
        <Text>
          <Translation id="page-languages-interested" />{" "}
          <Link to="/contributing/translation-program/">
            <Translation id="page-languages-learn-more" />
          </Link>
          .
        </Text>
        <ContentHeading as="h2">
          <Translation id="page-contributing-translation-program-contributors-thank-you" />
        </ContentHeading>
        <UnorderedList
          display="grid"
          gridTemplateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(6, 1fr)",
          }}
        >
          {translatorData
            .map(({ user }) => user.username)
            .sort((user1, user2) =>
              user1.toLowerCase().localeCompare(user2.toLowerCase())
            )
            .map((user) => {
              return (
                <ListItem key={user} color="text300">
                  {user}
                </ListItem>
              )
            })}
        </UnorderedList>
        <Text>
          <Translation id="page-languages-interested" />{" "}
          <Link to="/contributing/translation-program/">
            <Translation id="page-languages-learn-more" />
          </Link>
          .
        </Text>
      </Content>
      <Content>
        <FeedbackCard />
      </Content>
    </Flex>
  )
}

export default Contributors

export const query = graphql`
  query ContributorsPage {
    allTimeData: alltimeJson {
      data {
        user {
          username
          fullName
        }
      }
    }
  }
`
