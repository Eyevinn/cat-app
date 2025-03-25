import { CAT, CommonAccessToken } from "@eyevinn/cat";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import {Accordion, AccordionItem} from "@heroui/accordion";
import { Alert } from "@heroui/alert";
import ReactJsonView from '@microlink/react-json-view';
import { useState } from "react";

export default function ParseCard() {
  const [cat, setCat] = useState<CommonAccessToken | undefined>(undefined);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const parser = new CAT({
    keys: {
      Symmetric256: Buffer.from(
        "403697de87af64611c1d32a05dab0fe1fcb715a86ab435f1ec99192d79569388",
        "hex",
      ),
    }
  })
  const parse = async (token: string) => {
    const decoded = await parser.validate(token, 'mac', {
      alg: 'HS256',
      issuer: 'eyevinn'
    });

    if (decoded.cat) {
      setCat(decoded.cat);
    }
    if (decoded.error) {
      setMessage(decoded.error.message);
    }
  };

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Input
              label="Common Access Token"
              type="text"
              placeholder="Insert a base64 encoded token here"
              onValueChange={setToken}
            />
            <Button
              color="primary"
              isDisabled={!token}
              onPress={(e) => parse(token)}
            >
              Parse
            </Button>
          </div>
          {message && <Alert color="danger" description={message} />}
          {cat && (
            <ReactJsonView
              src={cat.claims}
              theme="tomorrow"
              name="cat"
              iconStyle="square"
              displayObjectSize={false}
              displayDataTypes={false}
            />
          )}
          <Accordion>
            <AccordionItem key="settings" aria-label="Settings" title="Settings">
              <div className="flex flex-row gap-2">
                <Input label="Key Id" defaultValue="Symmetric256" type="text" />
                <Input label="Key (hex)" defaultValue="403697de87af64611c1d32a05dab0fe1fcb715a86ab435f1ec99192d79569388" type="text" />
                <Input label="Algorithm" defaultValue="HS256" type="text" />
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </CardBody>
    </Card>
  )
}
