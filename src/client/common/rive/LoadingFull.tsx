import * as React from "react";
import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";

type Props = {
  className?: string;
};

export const LoadingFull: React.FC<Props> = (props) => {
  const { RiveComponent } = useRive({
    src: "/assets/leaguelink_loadingFull.riv",
    stateMachines: "Idle",
    artboard: "Loading",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  return <RiveComponent className={props.className} />;
};
