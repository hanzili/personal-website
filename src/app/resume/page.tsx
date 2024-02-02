import { PDFViewer } from "@/components/PDFViewer";
import { Button } from "@mantine/core";
import Link from "next/link";
import { IconDownload } from "@tabler/icons-react";

export default function Resume() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Link href="./resume.pdf" className="border">
        <Button
          rightSection={<IconDownload size={14} />}
          variant="default"
          color="gray"
        >
          Download
        </Button>
      </Link>
      <PDFViewer />
    </div>
  );
}
