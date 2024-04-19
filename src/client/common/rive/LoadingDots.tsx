import * as React from "react";
import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";

type Props = {
  className?: string;
};

export const LoadingDots: React.FC<Props> = (props) => {
  const { RiveComponent } = useRive({
    src: "/assets/leaguelink_loadingDots.riv",
    stateMachines: "Idle",
    artboard: "Loading",
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitHeight,
      alignment: Alignment.Center,
    }),
  });

  return <RiveComponent className={props.className} />;
};
