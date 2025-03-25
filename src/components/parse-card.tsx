import { CAT, CommonAccessToken } from "@eyevinn/cat";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Alert } from "@heroui/alert";
import ReactJsonView from "@microlink/react-json-view";
import { useState } from "react";

import SettingsAccordion from "./settings-accordion";

export interface ParseCardProps {
  defaultValue: string;
  onTokenChange?: (token: string) => void;
}

export default function ParseCard({
  defaultValue,
  onTokenChange,
}: ParseCardProps) {
  const [cat, setCat] = useState<CommonAccessToken | undefined>(undefined);
  const [token, setToken] = useState(defaultValue);
  const [message, setMessage] = useState("");
  const [keyId, setKeyId] = useState("Symmetric256");
  const [key, setKey] = useState(
    "403697de87af64611c1d32a05dab0fe1fcb715a86ab435f1ec99192d79569388",
  );
  const [alg, setAlg] = useState("HS256");

  const parse = async (token: string) => {
    if (!keyId && !key && !alg) {
      setMessage("Key Id, Key and Algorithm must be set");

      return;
    }
    const keys: { [id: string]: Buffer } = {};

    keys[keyId] = Buffer.from(key, "hex");
    const parser = new CAT({ keys });

    try {
      const decoded = await parser.validate(token, "mac", {
        alg,
        issuer: "eyevinn",
      });

      if (decoded.cat) {
        setCat(decoded.cat);
      }
      if (decoded.error) {
        setMessage(decoded.error.message);
      }
    } catch (err) {
      setMessage((err as Error).message);
    }
  };

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <Input
              label="Common Access Token"
              placeholder="Insert a base64 encoded token here"
              type="text"
              isClearable={true}
              defaultValue={token}
              onValueChange={(value) => {
                setToken(value);
                onTokenChange && onTokenChange(value);
              }}
            />
            <Button
              color="primary"
              isDisabled={!token}
              onPress={() => parse(token)}
            >
              Parse
            </Button>
          </div>
          {message && <Alert color="danger" description={message} />}
          {cat && (
            <ReactJsonView
              displayDataTypes={false}
              displayObjectSize={false}
              iconStyle="square"
              name="cat"
              src={cat.claims}
              theme="tomorrow"
            />
          )}
          <SettingsAccordion
            handleSettingsChange={({ keyId, key, alg }) => {
              setKeyId(keyId);
              setKey(key);
              setAlg(alg);
            }}
          />
        </div>
      </CardBody>
    </Card>
  );
}
