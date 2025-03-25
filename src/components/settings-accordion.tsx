import { Accordion, AccordionItem } from "@heroui/accordion";
import { Input } from "@heroui/input";
import { FC, useState } from "react";

export interface Settings {
  keyId: string;
  key: string;
  alg: string;
}

export interface SettingsAccordionProps {
  handleSettingsChange: (settings: Settings) => void;
}

const SettingsAccordion: FC<SettingsAccordionProps> = ({
  handleSettingsChange,
}) => {
  const [keyId, setKeyId] = useState("Symmetric256");
  const [key, setKey] = useState(
    "403697de87af64611c1d32a05dab0fe1fcb715a86ab435f1ec99192d79569388",
  );
  const [alg, setAlg] = useState("HS256");

  return (
    <Accordion>
      <AccordionItem key="settings" aria-label="Settings" title="Settings">
        <div className="flex flex-row gap-2">
          <Input
            label="Key Id"
            value={keyId}
            type="text"
            onValueChange={(value) => {
              setKeyId(value);
              handleSettingsChange({ keyId: value, key, alg });
            }}
          />
          <Input
            label="Key (hex)"
            value={key}
            type="text"
            onValueChange={(value) => {
              setKey(value);
              handleSettingsChange({ keyId, key: value, alg });
            }}
          />
          <Input
            label="Algorithm"
            value={alg}
            type="text"
            onValueChange={(value) => {
              setAlg(value);
              handleSettingsChange({ keyId, key, alg: value });
            }}
          />
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default SettingsAccordion;
