import {NextPage} from "next";
import Router from "next-translate/Router";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getNamespace} from "@sentrei/common/firebase/namespaces";

import SkeletonList from "@sentrei/ui/components/SkeletonList";
import SpaceAnalytics from "@sentrei/ui/components/SpaceAnalytics";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const AnalyticsPage: NextPage = () => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);
  const [spaceId, setSpaceId] = React.useState<string | null | undefined>();

  React.useEffect(() => {
    async function setSpace(): Promise<void> {
      const namespace = await getNamespace(String(query.namespaceId));
      if (!namespace || namespace.type === "user") {
        return;
      }
      setSpaceId(namespace.uid);
    }
    setSpace();
  }, [query.namespaceId]);

  if (!user && typeof window !== "undefined") {
    Router.pushI18n("/");
  }

  if (user === undefined || !profile || !spaceId) {
    return (
      <>
        <SentreiAppHeader skeleton tabSpaceKey="analytics" type="space" />
        <SkeletonList />
      </>
    );
  }

  return (
    <>
      {user && (
        <SentreiAppHeader
          notificationCount={Number(user.notificationCount)}
          profile={profile}
          userId={user.uid}
          namespaceId={String(query.namespaceId)}
          tabSpaceKey="analytics"
          type="space"
        />
      )}
      <SpaceAnalytics spaceId={spaceId} />
    </>
  );
};

export default AnalyticsPage;