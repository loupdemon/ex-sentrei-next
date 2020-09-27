import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Metrics from "@sentrei/types/models/Metrics";

const db = admin.firestore();

/**
 * Reset Member Metrics for Hour
 */
const hourMemberReset = functions.pubsub.schedule("0 * * * *").onRun(() => {
  const metricsData = <Metrics.Update>{period: {hour: 0}};
  db.collection("spaces")
    .get()
    .then(spaceShot => {
      spaceShot.forEach(space => {
        space.ref
          .collection("members")
          .get()
          .then(memberShot => {
            memberShot.forEach(member => {
              try {
                db.doc(
                  `spaces/${space.id}/members/${member.id}/admin/metrics`,
                ).update(metricsData);
              } catch (err) {
                console.error(err.message);
              }
            });
          });
      });
    });
  return;
});

export default hourMemberReset;
