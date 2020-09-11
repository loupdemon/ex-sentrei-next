import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {quitRoom} from "@sentrei/common/firebase/rooms";
import Member from "@sentrei/types/models/Member";
import FormQuit from "@sentrei/ui/components/FormQuit";
import FormSection from "@sentrei/ui/components/FormSection";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

interface Props {
  namespaceId: string;
  role: Member.Role;
  roomId: string;
  userId: string;
}

const RoomQuitBoard = ({
  namespaceId,
  role,
  roomId,
  userId,
}: Props): JSX.Element => {
  const {snackbar} = useSnackbar();
  const {backdrop} = useBackdrop();
  const {t} = useTranslation();

  const onSubmit = async (): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.quiting"));
    try {
      await quitRoom(roomId, userId)?.then(() => {
        snackbar("success", t("snackbar:snackbar.quitted"));
        backdrop("loading");
        Router.pushI18n("/[namespaceId]", `/${namespaceId}`);
      });
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return (
    <>
      <FormSection
        icon={<ExitToAppIcon />}
        title={t("room:room.quitRoom")}
        size="md"
      />
      <FormQuit
        id={roomId}
        disabled={role !== "admin"}
        event="Quit Room"
        onSubmit={onSubmit}
        type="quit"
      />
    </>
  );
};

export default RoomQuitBoard;
