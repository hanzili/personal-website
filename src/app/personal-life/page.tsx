
import { Button } from "@mantine/core";
import Link from "next/link";
import { IconDownload } from "@tabler/icons-react";

export default function Resume() {
  return (
    <div>
      <Link href="./resume.pdf">
        <Button rightSection={<IconDownload size={14} />}>Download</Button>
      </Link>

    </div>
  );
}
