import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {quitSpace} from "@sentrei/common/firebase/spaces";
import QuitForm from "@sentrei/ui/components/QuitForm";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

interface Props {
  namespaceId: string;
  userId: string;
}

const SpaceQuitForm = ({namespaceId, userId}: Props): JSX.Element => {
  const {snackbar} = useSnackbar();
  const {backdrop} = useBackdrop();
  const {t} = useTranslation();

  const onSubmit = async (): Promise<void> => {
    snackbar("info", t("common:snackbar.quiting"));
    try {
      await quitSpace(namespaceId, userId)?.then(() => {
        snackbar("success");
        backdrop("loading");
      });
      Router.pushI18n("/dashboard");
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return <QuitForm id={namespaceId} onSubmit={onSubmit} />;
};

export default SpaceQuitForm;
