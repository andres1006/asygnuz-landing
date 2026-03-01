import { Composition } from "remotion";
import { HeroBackground } from "./HeroBackground";
import React from "react";

export const Root = () => {
  return (
    <>
      <Composition
        id="HeroBackground"
        component={HeroBackground}
        durationInFrames={600} // 10 segundos
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
