import { Composition } from "remotion";
import { AsygnuzVSL } from "./AsygnuzVSL";

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="AsygnuzVSL"
                component={AsygnuzVSL}
                durationInFrames={1800}
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};
