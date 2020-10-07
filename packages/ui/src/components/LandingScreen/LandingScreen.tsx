import Box from "@material-ui/core/Box";
import * as React from "react";

import LandingBanner from "@sentrei/ui/components/LandingBanner";
import LandingExplore from "@sentrei/ui/components/LandingExplore";
import LandingFaq from "@sentrei/ui/components/LandingFaq";
import LandingOutline from "@sentrei/ui/components/LandingOutline";
import LandingPricing from "@sentrei/ui/components/LandingPricing";
import LandingTimelinePoint from "@sentrei/ui/components/LandingTimelinePoint";

export default function LandingScreen(): JSX.Element {
  return (
    <>
      <LandingBanner />
      <Box p={5} />
      <LandingOutline />
      <Box p={4} />
      <LandingExplore />
      <Box p={3} />
      <LandingTimelinePoint type="bond" />
      <Box p={3} />
      <LandingTimelinePoint type="focus" />
      <Box p={3} />
      <LandingTimelinePoint type="work" />
      <Box p={3} />
      <LandingPricing />
      <Box p={3} />
      <LandingFaq />
      <Box p={3} />
    </>
  );
}
