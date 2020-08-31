import Error from "next/error";
import * as React from "react";

import {getMembersLive} from "@sentrei/common/firebase/members";
import {getRoomsLive} from "@sentrei/common/firebase/rooms";
import {getSpace} from "@sentrei/common/firebase/spaces";
import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import SkeletonScreen from "@sentrei/ui/components/SkeletonScreen";
import SpaceHome from "@sentrei/ui/components/SpaceHome";

export interface Props {
  user: User.Get;
  profile: Profile.Get;
  memberData: Member.Get;
  membersData: Member.Get[];
  roomsData: Room.Get[] | null;
  spaceData: Space.Get;
  namespaceId: string;
}

export default function SpaceScreen({
  user,
  profile,
  memberData,
  membersData,
  roomsData,
  spaceData,
  namespaceId,
}: Props): JSX.Element {
  const [space, setSpace] = React.useState<Space.Get | null | undefined>(
    spaceData,
  );
  const [member, setMember] = React.useState<Member.Get | null | undefined>(
    memberData,
  );
  const [members, setMembers] = React.useState<Member.Get[] | null | undefined>(
    membersData,
  );
  const [rooms, setRooms] = React.useState<Room.Get[] | null | undefined>(
    roomsData,
  );

  React.useEffect(() => {
    getSpace(namespaceId).then(setSpace);
  }, [namespaceId]);

  React.useEffect(() => {
    const unsubscribe = getMembersLive(namespaceId, snap => {
      setMember(snap.filter(doc => doc.uid === profile.uid)[0]);
      setMembers(snap);
    });
    return (): void => {
      unsubscribe();
    };
  }, [namespaceId, profile]);

  React.useEffect(() => {
    const unsubscribe = getRoomsLive(namespaceId, snap => {
      setRooms(snap);
    });
    return (): void => {
      unsubscribe();
    };
  }, [namespaceId]);

  if (space === undefined || members === undefined || rooms === undefined) {
    return <SkeletonScreen />;
  }

  if (!space || !members) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      {space && members && member && (
        <SpaceHome
          member={member}
          members={members}
          profile={profile}
          rooms={rooms}
          space={space}
          user={user}
        />
      )}
    </>
  );
}
