import { jsPDF } from 'jspdf';
import { BusinessAssessmentResult, LeadCaptureData } from '../types.ts';
import type { BusinessLocale } from '../i18n/types.ts';

function formatCurrency(val: number, localeStr = 'pt-BR', currencyCode = 'BRL'): string {
  return val.toLocaleString(localeStr, { style: 'currency', currency: currencyCode, maximumFractionDigits: 0 });
}

export function generateBusinessPdf(
  assessment: BusinessAssessmentResult,
  mode: 'preview' | 'complete',
  lead?: LeadCaptureData,
  locale?: BusinessLocale
): void {
  const p = locale!.pdf;
  const ui = locale!.ui;
  const sizeInfo = locale!.companySizes[assessment.input.companySize];
  const maturityInfo = locale!.maturityLevels[assessment.input.maturityLevel];
  const goalInfo = locale!.projectGoals[assessment.input.primaryGoal];

  const fmt = (val: number) => formatCurrency(val, p.currencyLocale, p.currencyCode);

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  const primaryColor = { r: 15, g: 23, b: 42 };
  const accentColor = { r: 14, g: 165, b: 233 };
  const textDark = { r: 51, g: 65, b: 85 };
  const textLight = { r: 100, g: 116, b: 139 };

  const drawHeader = (pageNumber: number, totalPages: number, pageTitle: string) => {
    doc.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.rect(0, 0, pageWidth, 18, 'F');

    doc.setFillColor(accentColor.r, accentColor.g, accentColor.b);
    doc.rect(0, 18, pageWidth, 1.5, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(p.headerBrand, margin, 11);

    doc.setTextColor(203, 213, 225);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text(pageTitle, pageWidth - margin, 11, { align: 'right' });

    doc.setFillColor(248, 250, 252);
    doc.rect(0, pageHeight - 12, pageWidth, 12, 'F');

    doc.setDrawColor(226, 232, 240);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFontSize(8);
    doc.setTextColor(textLight.r, textLight.g, textLight.b);
    doc.text(p.footerDisclaimer, margin, pageHeight - 5);
    doc.text(`${p.footerPage} ${pageNumber} ${p.footerOf} ${totalPages}`, pageWidth - margin, pageHeight - 5, {
      align: 'right'
    });
  };

  const drawCard = (
    x: number,
    y: number,
    w: number,
    h: number,
    fillColor = [255, 255, 255],
    strokeColor = [226, 232, 240]
  ) => {
    doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
    doc.setDrawColor(strokeColor[0], strokeColor[1], strokeColor[2]);
    doc.roundedRect(x, y, w, h, 2, 2, 'FD');
  };

  const { sector, input, capexMin, capexMax, opexMonthlyMin, opexMonthlyMax, timelineWeeksMin, timelineWeeksMax } =
    assessment;

  if (mode === 'preview') {
    const totalPages = 2;

    // --- PAGE 1 ---
    drawHeader(1, totalPages, p.previewBannerTitle);

    let currentY = 28;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    const badgeW = Math.max(55, doc.getTextWidth(p.previewBadge) + 8);
    doc.setFillColor(240, 249, 255);
    doc.setDrawColor(186, 230, 253);
    doc.roundedRect(margin, currentY, badgeW, 6, 1, 1, 'FD');
    doc.setTextColor(3, 105, 161);
    doc.text(p.previewBadge, margin + 3, currentY + 4.2);

    currentY += 11;

    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(17);
    doc.text(`${p.coverSubtitle} ${sector.name}`, margin, currentY);

    currentY += 6;
    doc.setTextColor(textDark.r, textDark.g, textDark.b);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const subtitle = `${p.previewHeaderSubtitle} ${input.specificNiche || sector.typicalNiches[0]}.`;
    const splitSub = doc.splitTextToSize(subtitle, contentWidth);
    doc.text(splitSub, margin, currentY);

    currentY += 10;

    drawCard(margin, currentY, contentWidth, 24, [248, 250, 252], [203, 213, 225]);

    const colW = contentWidth / 3;
    doc.setFontSize(8);
    doc.setTextColor(textLight.r, textLight.g, textLight.b);
    doc.text(p.metaHeaders.colA, margin + 4, currentY + 6);
    doc.text(p.metaHeaders.colB, margin + colW + 4, currentY + 6);
    doc.text(p.metaHeaders.labelCompany, margin + colW * 2 + 4, currentY + 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(sizeInfo.label.substring(0, 28), margin + 4, currentY + 14);
    doc.text(maturityInfo.badge.substring(0, 28), margin + colW + 4, currentY + 14);
    doc.text(goalInfo.label.substring(0, 30), margin + colW * 2 + 4, currentY + 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textDark.r, textDark.g, textDark.b);
    doc.text(sizeInfo.badge.substring(0, 30), margin + 4, currentY + 20);
    doc.text(maturityInfo.label.substring(0, 30), margin + colW + 4, currentY + 20);
    doc.text(goalInfo.badge.substring(0, 30), margin + colW * 2 + 4, currentY + 20);

    currentY += 32;

    const cardHalfW = (contentWidth - 6) / 2;

    drawCard(margin, currentY, cardHalfW, 36, [255, 255, 255], [14, 165, 233]);
    doc.setFillColor(14, 165, 233);
    doc.rect(margin, currentY, 3, 36, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(14, 165, 233);
    doc.text(p.capexLabel, margin + 7, currentY + 8);

    doc.setFontSize(15);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(`${fmt(capexMin)} ${p.rangeJoin} ${fmt(capexMax)}`, margin + 7, currentY + 18);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textLight.r, textLight.g, textLight.b);
    doc.text(p.capexSubnote, margin + 7, currentY + 25);
    doc.text(
      `${p.sprintsSubnotePrefix} ${assessment.sprintsCount} ${p.sprintsSubnoteSuffix} (${timelineWeeksMin} ${p.rangeJoin} ${timelineWeeksMax} ${p.weeksUnit.toLowerCase()}).`,
      margin + 7,
      currentY + 30
    );

    drawCard(margin + cardHalfW + 6, currentY, cardHalfW, 36, [255, 255, 255], [16, 185, 129]);
    doc.setFillColor(16, 185, 129);
    doc.rect(margin + cardHalfW + 6, currentY, 3, 36, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(16, 185, 129);
    doc.text(p.opexLabel, margin + cardHalfW + 13, currentY + 8);

    doc.setFontSize(15);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(`${fmt(opexMonthlyMin)} ${p.rangeJoin} ${fmt(opexMonthlyMax)} ${p.perMonth}`, margin + cardHalfW + 13, currentY + 18);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textLight.r, textLight.g, textLight.b);
    doc.text(p.opexSubnote, margin + cardHalfW + 13, currentY + 25);
    doc.text(
      `${p.cloudProviderLabel} ${assessment.cloudSimulation.provider} (${assessment.cloudSimulation.tier}).`.substring(0, 56),
      margin + cardHalfW + 13,
      currentY + 30
    );

    currentY += 44;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(p.recommendedStackTitle, margin, currentY);

    currentY += 6;
    drawCard(margin, currentY, contentWidth, 48, [248, 250, 252], [226, 232, 240]);

    const stackItems = [
      { label: p.stackLayers.frontend, val: sector.recommendedFrontend },
      { label: p.stackLayers.backend, val: sector.recommendedBackend },
      { label: p.stackLayers.database, val: sector.recommendedDatabase },
      { label: p.stackLayers.cloud, val: sector.recommendedCloud }
    ];

    stackItems.forEach((item, idx) => {
      const itemY = currentY + 6 + idx * 10;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(textDark.r, textDark.g, textDark.b);
      doc.text(`${item.label}:`, margin + 5, itemY);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
      doc.text(item.val.substring(0, 74), margin + 48, itemY);

      if (idx < stackItems.length - 1) {
        doc.setDrawColor(235, 238, 242);
        doc.line(margin + 5, itemY + 3.5, margin + contentWidth - 5, itemY + 3.5);
      }
    });

    currentY += 56;

    drawCard(margin, currentY, contentWidth, 34, [241, 245, 249], [14, 165, 233]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(14, 165, 233);
    doc.text(p.inviteBoxTitle, margin + 6, currentY + 9);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(textDark.r, textDark.g, textDark.b);
    if (p.inviteBoxLines[0]) doc.text(p.inviteBoxLines[0], margin + 6, currentY + 16);
    if (p.inviteBoxLines[1]) doc.text(p.inviteBoxLines[1], margin + 6, currentY + 22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    if (p.inviteBoxLines[2]) doc.text(p.inviteBoxLines[2], margin + 6, currentY + 28);

    // --- PAGE 2 ---
    doc.addPage();
    drawHeader(2, totalPages, p.footerPreviewNote);

    currentY = 28;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(`${p.challengesTitle} ${sector.name}`, margin, currentY);

    currentY += 8;

    sector.primaryChallenges.forEach((chal) => {
      drawCard(margin, currentY, contentWidth, 12, [255, 255, 255], [226, 232, 240]);
      doc.setFillColor(14, 165, 233);
      doc.circle(margin + 5, currentY + 6, 1.5, 'F');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(textDark.r, textDark.g, textDark.b);
      doc.text(chal.substring(0, 96), margin + 11, currentY + 7.5);

      currentY += 15;
    });

    currentY += 6;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(p.completeArchTitle, margin, currentY);

    currentY += 6;
    drawCard(margin, currentY, contentWidth, 26, [248, 250, 252], [203, 213, 225]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(textDark.r, textDark.g, textDark.b);
    const splitHighlight = doc.splitTextToSize(sector.architectureHighlight, contentWidth - 10);
    doc.text(splitHighlight, margin + 5, currentY + 7);

    currentY += 34;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(p.completeChallengesTitle, margin, currentY);

    currentY += 6;

    sector.lgpdConsiderations.forEach((item) => {
      drawCard(margin, currentY, contentWidth, 11, [255, 255, 255], [226, 232, 240]);
      doc.setFillColor(16, 185, 129);
      doc.circle(margin + 5, currentY + 5.5, 1.5, 'F');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(textDark.r, textDark.g, textDark.b);
      doc.text(item.substring(0, 96), margin + 11, currentY + 7);

      currentY += 14;
    });

    currentY += 10;

    drawCard(margin, currentY, contentWidth, 28, [15, 23, 42], [15, 23, 42]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(p.finalCtaTitle, margin + 6, currentY + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(203, 213, 225);
    const splitCta = doc.splitTextToSize(p.finalCtaBody, contentWidth - 12);
    doc.text(splitCta, margin + 6, currentY + 14);
    doc.setTextColor(14, 165, 233);
    doc.setFont('helvetica', 'bold');
    doc.text(p.finalCtaContact, margin + 6, currentY + 23);
  } else {
    const totalPages = 6;

    // --- PAGE 1: COVER & EXEC SUMMARY ---
    drawHeader(1, totalPages, p.completeHeaderBrand);

    let currentY = 28;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    const proBadgeW = Math.max(65, doc.getTextWidth(p.coverBadge) + 8);
    doc.setFillColor(15, 23, 42);
    doc.roundedRect(margin, currentY, proBadgeW, 6.5, 1, 1, 'F');
    doc.setTextColor(14, 165, 233);
    doc.text(p.coverBadge, margin + 3, currentY + 4.5);

    currentY += 12;

    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text(p.coverTitle, margin, currentY);

    currentY += 7;
    doc.setFontSize(11.5);
    doc.setTextColor(textDark.r, textDark.g, textDark.b);
    doc.text(`${p.sectorLabel} ${sector.name} // ${p.nicheLabel} ${input.specificNiche || sector.typicalNiches[0]}`, margin, currentY);

    if (lead?.companyName) {
      currentY += 6;
      doc.setFontSize(9.5);
      doc.setTextColor(14, 165, 233);
      doc.setFont('helvetica', 'bold');
      doc.text(`${p.preparedFor} ${lead.companyName} (${p.metaHeaders.labelPhone} ${lead.name || '-'})`, margin, currentY);
    }

    currentY += 12;

    drawCard(margin, currentY, contentWidth, 38, [248, 250, 252], [203, 213, 225]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(p.summaryTitle, margin + 5, currentY + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(textDark.r, textDark.g, textDark.b);
    doc.text(`• ${p.sizeLabel} ${sizeInfo.label} (${sizeInfo.badge})`.substring(0, 95), margin + 5, currentY + 15);
    doc.text(`• ${p.maturityLabel} ${maturityInfo.label} - ${maturityInfo.summary}`.substring(0, 95), margin + 5, currentY + 21);
    doc.text(`• ${p.goalLabel} ${goalInfo.label}`.substring(0, 95), margin + 5, currentY + 27);
    if (input.customRequirements) {
      doc.text(`• ${p.customScopeLabel} "${input.customRequirements.substring(0, 70)}"`, margin + 5, currentY + 33);
    }

    currentY += 46;

    const cardGridW = (contentWidth - 6) / 2;

    drawCard(margin, currentY, cardGridW, 30, [255, 255, 255], [14, 165, 233]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(14, 165, 233);
    doc.text(p.capexLabel, margin + 5, currentY + 7);
    doc.setFontSize(14);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(`${fmt(capexMin)} ${p.rangeJoin} ${fmt(capexMax)}`, margin + 5, currentY + 16);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(textLight.r, textLight.g, textLight.b);
    doc.text(p.capexSubnote.substring(0, 50), margin + 5, currentY + 23);

    drawCard(margin + cardGridW + 6, currentY, cardGridW, 30, [255, 255, 255], [16, 185, 129]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(16, 185, 129);
    doc.text(p.opexLabel, margin + cardGridW + 11, currentY + 7);
    doc.setFontSize(14);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(`${fmt(opexMonthlyMin)} ${p.rangeJoin} ${fmt(opexMonthlyMax)} ${p.perMonth}`, margin + cardGridW + 11, currentY + 16);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(textLight.r, textLight.g, textLight.b);
    doc.text(p.opexSubnote.substring(0, 50), margin + cardGridW + 11, currentY + 23);

    currentY += 36;

    drawCard(margin, currentY, cardGridW, 30, [255, 255, 255], [203, 213, 225]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(textLight.r, textLight.g, textLight.b);
    doc.text(p.timelineLabel, margin + 5, currentY + 7);
    doc.setFontSize(14);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(`${timelineWeeksMin} ${p.rangeJoin} ${timelineWeeksMax} ${p.weeksUnit}`, margin + 5, currentY + 16);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(textLight.r, textLight.g, textLight.b);
    doc.text(`${assessment.sprintsCount} ${p.sprintsUnit}`, margin + 5, currentY + 23);

    drawCard(margin + cardGridW + 6, currentY, cardGridW, 30, [255, 255, 255], [203, 213, 225]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(textLight.r, textLight.g, textLight.b);
    doc.text(p.squadTitle.substring(0, 34).toUpperCase(), margin + cardGridW + 11, currentY + 7);
    doc.setFontSize(14);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(`${assessment.recommendedSquad.length} ${ui.professionalsUnit}`, margin + cardGridW + 11, currentY + 16);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(textLight.r, textLight.g, textLight.b);
    doc.text(ui.squadSummaryNote.substring(0, 50), margin + cardGridW + 11, currentY + 23);

    currentY += 38;

    drawCard(margin, currentY, contentWidth, 34, [248, 250, 252], [226, 232, 240]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(p.premisesTitle, margin + 5, currentY + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(textDark.r, textDark.g, textDark.b);
    const splitSummary = doc.splitTextToSize(p.operationalImpactPrefix, contentWidth - 10);
    doc.text(splitSummary, margin + 5, currentY + 16);

    // --- PAGE 2: ARCHITECTURE ---
    doc.addPage();
    drawHeader(2, totalPages, p.completePage2Title);

    currentY = 28;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(p.recommendedStackPreviewTitle, margin, currentY);

    currentY += 8;

    const layers = [
      {
        title: p.stackGenericSpecs[0]?.title ?? p.stackLayerNames.frontend,
        tech: sector.recommendedFrontend,
        detail: p.stackGenericSpecs[0]?.detail ?? ''
      },
      {
        title: p.stackGenericSpecs[1]?.title ?? p.stackLayerNames.backend,
        tech: sector.recommendedBackend,
        detail: p.stackGenericSpecs[1]?.detail ?? ''
      },
      {
        title: p.stackGenericSpecs[2]?.title ?? p.stackLayerNames.database,
        tech: sector.recommendedDatabase,
        detail: p.stackGenericSpecs[2]?.detail ?? ''
      },
      {
        title: p.stackGenericSpecs[3]?.title ?? p.stackLayerNames.cloud,
        tech: sector.recommendedCloud,
        detail: p.stackGenericSpecs[3]?.detail ?? ''
      }
    ];

    layers.forEach((layer) => {
      drawCard(margin, currentY, contentWidth, 32, [255, 255, 255], [226, 232, 240]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
      doc.text(layer.title, margin + 5, currentY + 7);

      doc.setFontSize(8.5);
      doc.setTextColor(14, 165, 233);
      doc.text(`${p.techRecommendedPrefix} ${layer.tech}`.substring(0, 90), margin + 5, currentY + 14);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(textDark.r, textDark.g, textDark.b);
      const splitDetail = doc.splitTextToSize(layer.detail, contentWidth - 10);
      doc.text(splitDetail, margin + 5, currentY + 20);

      currentY += 36;
    });

    currentY += 4;
    drawCard(margin, currentY, contentWidth, 26, [248, 250, 252], [203, 213, 225]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(p.completeArchHighlightLabel, margin + 5, currentY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(textDark.r, textDark.g, textDark.b);
    const splitHighlight2 = doc.splitTextToSize(sector.architectureHighlight, contentWidth - 10);
    doc.text(splitHighlight2, margin + 5, currentY + 14);

    // --- PAGE 3: COST BREAKDOWN & SQUAD ---
    doc.addPage();
    drawHeader(3, totalPages, p.completePage3Title);

    currentY = 28;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(p.breakdownTitle, margin, currentY);

    currentY += 8;

    doc.setFillColor(15, 23, 42);
    doc.rect(margin, currentY, contentWidth, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(p.colCategory, margin + 4, currentY + 5.5);
    doc.text(p.colHours, margin + 95, currentY + 5.5);
    doc.text(p.colShare, margin + 115, currentY + 5.5);
    doc.text(p.colInvestment, pageWidth - margin - 4, currentY + 5.5, { align: 'right' });

    currentY += 8;

    assessment.costBreakdown.forEach((item, idx) => {
      const rowFill = idx % 2 === 0 ? [255, 255, 255] : [248, 250, 252];
      doc.setFillColor(rowFill[0], rowFill[1], rowFill[2]);
      doc.rect(margin, currentY, contentWidth, 14, 'F');
      doc.setDrawColor(235, 238, 242);
      doc.line(margin, currentY + 14, pageWidth - margin, currentY + 14);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
      doc.text(item.category.substring(0, 56), margin + 4, currentY + 5.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(textLight.r, textLight.g, textLight.b);
      doc.text(item.description.substring(0, 68), margin + 4, currentY + 10.5);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(textDark.r, textDark.g, textDark.b);
      doc.text(`${item.hours}h`, margin + 95, currentY + 7);
      doc.text(`${item.percentage}%`, margin + 115, currentY + 7);

      doc.setTextColor(14, 165, 233);
      doc.text(`${fmt(item.estimatedCostMin)} - ${fmt(item.estimatedCostMax)}`, pageWidth - margin - 4, currentY + 7, {
        align: 'right'
      });

      currentY += 14;
    });

    currentY += 10;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(p.squadTitle, margin, currentY);

    currentY += 6;

    assessment.recommendedSquad.forEach((member) => {
      drawCard(margin, currentY, contentWidth, 12, [255, 255, 255], [226, 232, 240]);
      doc.setFillColor(14, 165, 233);
      doc.circle(margin + 5, currentY + 6, 1.5, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
      doc.text(member.role, margin + 10, currentY + 7.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(textDark.r, textDark.g, textDark.b);
      doc.text(
        `${p.squadAllocPrefix} ${member.allocation} | ${p.squadCountPrefix} ${member.count}`,
        pageWidth - margin - 5,
        currentY + 7.5,
        { align: 'right' }
      );

      currentY += 15;
    });

    // --- PAGE 4: ROLLOUT ---
    doc.addPage();
    drawHeader(4, totalPages, p.completePage4Title);

    currentY = 28;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(`${p.rolloutTitle} (${timelineWeeksMin} ${p.rangeJoin} ${timelineWeeksMax} ${p.weeksUnit})`, margin, currentY);

    currentY += 8;

    assessment.rolloutPhases.forEach((phase, idx) => {
      drawCard(margin, currentY, contentWidth, 38, [255, 255, 255], [203, 213, 225]);

      const colors = [
        [14, 165, 233],
        [99, 102, 241],
        [16, 185, 129]
      ];
      const chosenColor = colors[idx % colors.length];
      doc.setFillColor(chosenColor[0], chosenColor[1], chosenColor[2]);
      doc.rect(margin, currentY, 3.5, 38, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
      doc.text(phase.phase.substring(0, 56), margin + 7, currentY + 8);

      doc.setFontSize(8.5);
      doc.setTextColor(chosenColor[0], chosenColor[1], chosenColor[2]);
      doc.text(`${p.rolloutDurationPrefix} ${phase.duration}`, pageWidth - margin - 5, currentY + 8, { align: 'right' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.3);
      doc.setTextColor(textDark.r, textDark.g, textDark.b);

      phase.deliverables.forEach((deliv, dIdx) => {
        doc.text(`• ${deliv.substring(0, 92)}`, margin + 7, currentY + 16 + dIdx * 6);
      });

      currentY += 44;
    });

    currentY += 4;
    drawCard(margin, currentY, contentWidth, 24, [248, 250, 252], [226, 232, 240]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(p.rolloutNotesTitle, margin + 5, currentY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textDark.r, textDark.g, textDark.b);
    const splitNotes = doc.splitTextToSize(p.rolloutNotes.join(' '), contentWidth - 10);
    doc.text(splitNotes, margin + 5, currentY + 13);

    // --- PAGE 5: CLOUD & RISKS ---
    doc.addPage();
    drawHeader(5, totalPages, p.completePage5Title);

    currentY = 28;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(`${p.cloudTitle} ${assessment.cloudSimulation.provider}`, margin, currentY);

    currentY += 6;
    drawCard(margin, currentY, contentWidth, 36, [248, 250, 252], [14, 165, 233]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(14, 165, 233);
    doc.text(`${p.cloudTierLabel} ${assessment.cloudSimulation.tier}`, margin + 5, currentY + 7);

    doc.setFontSize(11.5);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(
      `${p.cloudEstMonthlyLabel} ${fmt(assessment.cloudSimulation.estimatedMonthlyBrl)} ${p.perMonth}`,
      pageWidth - margin - 5,
      currentY + 7,
      { align: 'right' }
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textDark.r, textDark.g, textDark.b);
    doc.text(p.cloudServicesLabel, margin + 5, currentY + 14);

    assessment.cloudSimulation.services.forEach((srv, sIdx) => {
      doc.text(`• ${srv}`, margin + 5, currentY + 20 + sIdx * 3.8);
    });

    currentY += 44;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(p.risksTitle, margin, currentY);

    currentY += 6;

    assessment.strategicRisks.forEach((risk) => {
      drawCard(margin, currentY, contentWidth, 24, [255, 255, 255], [226, 232, 240]);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.8);
      doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
      doc.text(risk.risk.substring(0, 74), margin + 5, currentY + 7);

      const impactColor =
        risk.impact === 'Alto' ? [239, 68, 68] : risk.impact === 'Médio' ? [245, 158, 11] : [16, 185, 129];
      const localizedImpact = ui.impactMap[risk.impact] ?? risk.impact;
      const badgeLabel = `${p.impactBadgePrefix} ${localizedImpact}`;
      doc.setFontSize(7);
      const pillW = Math.max(22, doc.getTextWidth(badgeLabel) + 6);
      doc.setFillColor(impactColor[0], impactColor[1], impactColor[2]);
      doc.roundedRect(pageWidth - margin - pillW - 3, currentY + 3.5, pillW, 5, 1, 1, 'F');
      doc.setTextColor(255, 255, 255);
      doc.text(badgeLabel, pageWidth - margin - pillW / 2 - 3, currentY + 7, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(textDark.r, textDark.g, textDark.b);
      const splitMitigation = doc.splitTextToSize(`${p.mitigationPrefix} ${risk.mitigation}`, contentWidth - 10);
      doc.text(splitMitigation, margin + 5, currentY + 14);

      currentY += 28;
    });

    // --- PAGE 6: COMPLIANCE & NEXT STEPS ---
    doc.addPage();
    drawHeader(6, totalPages, p.completePage6Title);

    currentY = 28;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(p.complianceTitle, margin, currentY);

    currentY += 8;

    assessment.complianceChecklist.forEach((item) => {
      drawCard(margin, currentY, contentWidth, 12, [255, 255, 255], [226, 232, 240]);
      doc.setFillColor(16, 185, 129);
      doc.circle(margin + 5, currentY + 6, 1.5, 'F');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.2);
      doc.setTextColor(textDark.r, textDark.g, textDark.b);
      doc.text(item.substring(0, 96), margin + 10, currentY + 7.5);

      currentY += 15;
    });

    currentY += 8;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(p.nextStepsTitle, margin, currentY);

    currentY += 6;
    drawCard(margin, currentY, contentWidth, 34, [248, 250, 252], [203, 213, 225]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(textDark.r, textDark.g, textDark.b);

    p.nextSteps.forEach((step, sIdx) => {
      doc.text(step.substring(0, 96), margin + 5, currentY + 8 + sIdx * 6);
    });

    currentY += 42;

    drawCard(margin, currentY, contentWidth, 34, [15, 23, 42], [15, 23, 42]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text(p.finalCtaTitle, margin + 6, currentY + 9);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.3);
    doc.setTextColor(203, 213, 225);
    const splitFinalBody = doc.splitTextToSize(p.finalCtaBody, contentWidth - 12);
    doc.text(splitFinalBody, margin + 6, currentY + 16);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(14, 165, 233);
    doc.text(p.finalCtaContact, margin + 6, currentY + 28);
  }

  const filename =
    mode === 'preview' ? `${p.filenamePreviewPrefix}${sector.id}.pdf` : `${p.filenameCompletePrefix}${sector.id}.pdf`;

  doc.save(filename);
}
