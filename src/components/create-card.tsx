import { Card, CardBody } from "@heroui/card";
import { useMemo, useState } from "react";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";

import SettingsAccordion from "./settings-accordion";

const CAT_GENERATE_URL = "https://eyevinn-catweb.eyevinn-cat-validate.auto.prod.osaas.io/generate";

export default function CreateCard() {
  const [keyId, setKeyId] = useState("Symmetric256");
  const [key, setKey] = useState(
    "403697de87af64611c1d32a05dab0fe1fcb715a86ab435f1ec99192d79569388",
  );
  const [alg, setAlg] = useState("HS256");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState<string>("");
  const defaultClaims = {
    iss: "eyevinn",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  };

  const [claims, setClaims] = useState(JSON.stringify(defaultClaims, null, 2));

  const generateToken = () => {
    const keys: { [id: string]: Buffer } = {};

    keys[keyId] = Buffer.from(key, "hex");

    try {
      fetch(new URL(CAT_GENERATE_URL), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          claims: claims,
          key: {
            keyId,
            key,
          },
          alg,
        }),
      })
        .then((response) => {
          return response.text();
        })
        .then((token) => {
          setErrorMessage("");
          if (token) {
            setToken(token);
          }
        })
        .catch((err) => {
          setErrorMessage((err as Error).message);
          setToken("");
        });
    } catch (err) {
      setToken("");
      setErrorMessage((err as Error).message);
    }
  };

  const isInvalid = useMemo(() => {
    try {
      if (claims === "") {
        return false;
      }
      if (!JSON.parse(claims)) {
        return true;
      }

      return false;
    } catch (e) {
      setErrorMessage((e as Error).message);

      return true;
    }
  }, [claims]);

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-2">
          <Textarea
            color={isInvalid ? "danger" : "default"}
            errorMessage={errorMessage}
            isInvalid={isInvalid}
            label="Claims"
            name="Claims"
            value={claims}
            onValueChange={setClaims}
          />
          <Button
            color="primary"
            isDisabled={!claims || isInvalid}
            onPress={() => generateToken()}
          >
            Generate
          </Button>
          {token && (
            <Textarea
              isClearable={true}
              label="Common Access Token"
              value={token}
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
