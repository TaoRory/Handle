import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardBody, CardTitle } from "@/components/ui/card";

import type { CtaCopy } from "@/types";

interface WhatsAppQrCardProps {
    copy: Pick<CtaCopy["form"], "qrEyebrow" | "qrTitle" | "qrLead" | "qrAction">;
    qrSvg: string;
    href: string;
}

export function WhatsAppQrCard({ copy, qrSvg, href }: WhatsAppQrCardProps) {
    return (
        <Card variant="surface" padding="lg" className="shadow-lg rounded-sm">
            <div className="flex h-full flex-col justify-between gap-5">
                <div className="space-y-2">
                    <p className="font-brand text-gold text-xs tracking-[0.18em] uppercase">
                        {copy.qrEyebrow}
                    </p>
                    <CardTitle className="max-w-[14ch] text-[1.25rem] leading-tight lg:text-[1.35rem]">
                        {copy.qrTitle}
                    </CardTitle>
                    <CardBody className="text-ink-600 max-w-[24ch] text-sm leading-6">
                        {copy.qrLead}
                    </CardBody>
                </div>

                <div className="border-line bg-surface self-center rounded-lg border p-3">
                    <div
                        aria-hidden="true"
                        className="size-[220px] overflow-hidden rounded-md bg-white p-2"
                        dangerouslySetInnerHTML={{ __html: qrSvg }}
                    />
                </div>

                <Button asChild variant="outline" size="lg" className="w-full rounded-sm">
                    <Link href={href} target="_blank" rel="noreferrer noopener">
                        {copy.qrAction}
                    </Link>
                </Button>
            </div>
        </Card>
    );
}