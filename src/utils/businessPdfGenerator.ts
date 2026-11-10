import { jsPDF } from 'jspdf';
import { BusinessAssessmentResult, LeadCaptureData } from '../types.ts';
import { COMPANY_SIZES, MATURITY_LEVELS, PROJECT_GOALS } from '../data/businessData.ts';

function formatCurrency(val: number): string {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

export function generateBusinessPdf(
  assessment: BusinessAssessmentResult,
  mode: 'preview' | 'complete',
  lead?: LeadCaptureData
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Paleta de cores corporativa CodeCompare
  const primaryColor = { r: 15, g: 23, b: 42 }; // Slate 900
  const accentColor = { r: 14, g: 165, b: 233 }; // Sky 500
  const secondaryColor = { r: 30, g: 41, b: 59 }; // Slate 800
  const textDark = { r: 51, g: 65, b: 85 }; // Slate 700
  const textLight = { r: 100, g: 116, b: 139 }; // Slate 500
  const successColor = { r: 16, g: 185, b: 129 }; // Emerald 500

  const drawHeader = (pageNumber: number, totalPages: number, pageTitle: string) => {
    // Top Bar
    doc.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.rect(0, 0, pageWidth, 18, 'F');

    // Accent line
    doc.setFillColor(accentColor.r, accentColor.g, accentColor.b);
    doc.rect(0, 18, pageWidth, 1.5, 'F');

    // Title left
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('CODECOMPARE // INTELIGÊNCIA EM TI & ARQUITETURA', margin, 11);

    // Title right
    doc.setTextColor(203, 213, 225);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text(pageTitle, pageWidth - margin, 11, { align: 'right' });

    // Footer
    doc.setFillColor(248, 250, 252);
    doc.rect(0, pageHeight - 12, pageWidth, 12, 'F');

    doc.setDrawColor(226, 232, 240);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFontSize(8);
    doc.setTextColor(textLight.r, textLight.g, textLight.b);
    doc.text('Relatório confidencial gerado por CodeCompare - Análise Técnica & Orçamentária', margin, pageHeight - 5);
    doc.text(`Página ${pageNumber} de ${totalPages}`, pageWidth - margin, pageHeight - 5, { align: 'right' });
  };

  const drawCard = (x: number, y: number, w: number, h: number, fillColor = [255, 255, 255], strokeColor = [226, 232, 240]) => {
    doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
    doc.setDrawColor(strokeColor[0], strokeColor[1], strokeColor[2]);
    doc.roundedRect(x, y, w, h, 2, 2, 'FD');
  };

  const { sector, input, capexMin, capexMax, opexMonthlyMin, opexMonthlyMax, timelineWeeksMin, timelineWeeksMax } = assessment;
  const sizeInfo = COMPANY_SIZES[input.companySize];
  const maturityInfo = MATURITY_LEVELS[input.maturityLevel];
  const goalInfo = PROJECT_GOALS[input.primaryGoal];

  // ==========================================
  // RELATÓRIO 1: PREVIEW (1 a 2 páginas)
  // ==========================================
  if (mode === 'preview') {
    const totalPages = 2;

    // --- PÁGINA 1: VISÃO GERAL EXECUTIVA ---
    drawHeader(1, totalPages, 'SUMÁRIO EXECUTIVO PRELIMINAR');

    let currentY = 28;

    // Badge preview
    doc.setFillColor(240, 249, 255);
    doc.setDrawColor(186, 230, 253);
    doc.roundedRect(margin, currentY, 55, 6, 1, 1, 'FD');
    doc.setTextColor(3, 105, 161);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('PREVIEW GRATUITO // RESUMO', margin + 3, currentY + 4.2);

    currentY += 11;

    // Título Principal
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(`Diagnóstico de TI: ${sector.name}`, margin, currentY);

    currentY += 6;
    doc.setTextColor(textDark.r, textDark.g, textDark.b);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const subtitle = `Plano de viabilidade orçamentária e técnica para o segmento de ${input.specificNiche || sector.typicalNiches[0]}.`;
    doc.text(subtitle, margin, currentY);

    currentY += 10;

    // Box de Metadados da Empresa Avaliada
    drawCard(margin, currentY, contentWidth, 24, [248, 250, 252], [203, 213, 225]);

    const colW = contentWidth / 3;
    doc.setFontSize(8);
    doc.setTextColor(textLight.r, textLight.g, textLight.b);
    doc.text('PORTE DA EMPRESA', margin + 4, currentY + 6);
    doc.text('MATURIDADE ATUAL', margin + colW + 4, currentY + 6);
    doc.text('OBJETIVO PRINCIPAL', margin + colW * 2 + 4, currentY + 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(sizeInfo.label, margin + 4, currentY + 14);
    doc.text(maturityInfo.badge, margin + colW + 4, currentY + 14);
    doc.text(goalInfo.label.substring(0, 32), margin + colW * 2 + 4, currentY + 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textDark.r, textDark.g, textDark.b);
    doc.text(sizeInfo.badge, margin + 4, currentY + 20);
    doc.text(maturityInfo.label.substring(0, 30), margin + colW + 4, currentY + 20);
    doc.text(goalInfo.badge, margin + colW * 2 + 4, currentY + 20);

    currentY += 32;

    // Cards de Estimativa Financeira (Capex e Opex)
    const cardHalfW = (contentWidth - 6) / 2;

    // Card Investimento (Capex)
    drawCard(margin, currentY, cardHalfW, 36, [255, 255, 255], [14, 165, 233]);
    doc.setFillColor(14, 165, 233);
    doc.rect(margin, currentY, 3, 36, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(14, 165, 233);
    doc.text('INVESTIMENTO ESTIMADO (CAPEX)', margin + 7, currentY + 8);

    doc.setFontSize(16);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(`${formatCurrency(capexMin)} a ${formatCurrency(capexMax)}`, margin + 7, currentY + 18);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textLight.r, textLight.g, textLight.b);
    doc.text('Custo total de desenvolvimento do software sob medida.', margin + 7, currentY + 25);
    doc.text(`Equivalente a aprox. ${assessment.sprintsCount} sprints quinzenais (${timelineWeeksMin} a ${timelineWeeksMax} semanas).`, margin + 7, currentY + 30);

    // Card Custo Mensal (Opex)
    drawCard(margin + cardHalfW + 6, currentY, cardHalfW, 36, [255, 255, 255], [16, 185, 129]);
    doc.setFillColor(16, 185, 129);
    doc.rect(margin + cardHalfW + 6, currentY, 3, 36, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(16, 185, 129);
    doc.text('CUSTO OPERACIONAL MENSAL (OPEX)', margin + cardHalfW + 13, currentY + 8);

    doc.setFontSize(16);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(`${formatCurrency(opexMonthlyMin)} a ${formatCurrency(opexMonthlyMax)} /mês`, margin + cardHalfW + 13, currentY + 18);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textLight.r, textLight.g, textLight.b);
    doc.text('Hospedagem em nuvem gerenciada, banco de dados e APIs.', margin + cardHalfW + 13, currentY + 25);
    doc.text(`Infraestrutura recomendada: ${assessment.cloudSimulation.provider} (${assessment.cloudSimulation.tier}).`, margin + cardHalfW + 13, currentY + 30);

    currentY += 44;

    // Resumo da Arquitetura Tecnológica
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text('Arquitetura Tecnológica Recomendada', margin, currentY);

    currentY += 6;
    drawCard(margin, currentY, contentWidth, 48, [248, 250, 252], [226, 232, 240]);

    const stackItems = [
      { label: 'Camada Frontend', val: sector.recommendedFrontend },
      { label: 'Camada Backend & APIs', val: sector.recommendedBackend },
      { label: 'Banco de Dados & Cache', val: sector.recommendedDatabase },
      { label: 'Provedor de Nuvem', val: sector.recommendedCloud }
    ];

    stackItems.forEach((item, idx) => {
      const itemY = currentY + 6 + idx * 10;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(textDark.r, textDark.g, textDark.b);
      doc.text(`${item.label}:`, margin + 5, itemY);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
      doc.text(item.val, margin + 48, itemY);

      if (idx < stackItems.length - 1) {
        doc.setDrawColor(235, 238, 242);
        doc.line(margin + 5, itemY + 3.5, margin + contentWidth - 5, itemY + 3.5);
      }
    });

    currentY += 56;

    // Banner de Convite para Dossiê Completo
    drawCard(margin, currentY, contentWidth, 34, [241, 245, 249], [14, 165, 233]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(14, 165, 233);
    doc.text('Deseja a Análise Analítica Completa (Dossiê de 6 Páginas)?', margin + 6, currentY + 9);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(textDark.r, textDark.g, textDark.b);
    doc.text(
      'A versão detalhada inclui: Cronograma semana a semana de sprints, Composição exata do Squad,',
      margin + 6,
      currentY + 16
    );
    doc.text(
      'Breakdown de horas por etapa, Matriz de Riscos com mitigações e Checklist de conformidade LGPD.',
      margin + 6,
      currentY + 22
    );
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text('Acesse no portal CodeCompare e desbloqueie o Dossiê Completo gratuitamente.', margin + 6, currentY + 28);

    // --- PÁGINA 2: DESAFIOS E DIRETRIZES DO SETOR ---
    doc.addPage();
    drawHeader(2, totalPages, 'DESAFIOS & DIRETRIZES DO SETOR');

    currentY = 28;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(`Desafios Críticos no Setor de ${sector.name}`, margin, currentY);

    currentY += 8;

    sector.primaryChallenges.forEach((chal) => {
      drawCard(margin, currentY, contentWidth, 12, [255, 255, 255], [226, 232, 240]);
      doc.setFillColor(14, 165, 233);
      doc.circle(margin + 5, currentY + 6, 1.5, 'F');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(textDark.r, textDark.g, textDark.b);
      doc.text(chal, margin + 11, currentY + 7.5);

      currentY += 15;
    });

    currentY += 6;

    // Destaque Arquitetural
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text('Destaque Arquitetural Recomendado', margin, currentY);

    currentY += 6;
    drawCard(margin, currentY, contentWidth, 26, [248, 250, 252], [203, 213, 225]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(textDark.r, textDark.g, textDark.b);
    const splitHighlight = doc.splitTextToSize(sector.architectureHighlight, contentWidth - 10);
    doc.text(splitHighlight, margin + 5, currentY + 7);

    currentY += 34;

    // Considerações Regulatórias e LGPD
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text('Diretrizes de Proteção de Dados (LGPD) no Nicho', margin, currentY);

    currentY += 6;

    sector.lgpdConsiderations.forEach((item) => {
      drawCard(margin, currentY, contentWidth, 11, [255, 255, 255], [226, 232, 240]);
      doc.setFillColor(16, 185, 129);
      doc.circle(margin + 5, currentY + 5.5, 1.5, 'F');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(textDark.r, textDark.g, textDark.b);
      doc.text(item, margin + 11, currentY + 7);

      currentY += 14;
    });

    currentY += 10;

    // Box de contato e encerramento
    drawCard(margin, currentY, contentWidth, 26, [15, 23, 42], [15, 23, 42]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('Precisa de Apoio Técnico para Tirar Esse Projeto do Papel?', margin + 6, currentY + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(203, 213, 225);
    doc.text(
      'Nossos especialistas auxiliam sua empresa desde a validação de arquitetura até a entrega final.',
      margin + 6,
      currentY + 15
    );
    doc.setTextColor(14, 165, 233);
    doc.setFont('helvetica', 'bold');
    doc.text('Entre em contato: eduardolessa2011@gmail.com // Portal: www.devedulessa.com.br/', margin + 6, currentY + 21);

  } else {
    // ==========================================
    // RELATÓRIO 2: DOSSIÊ COMPLETO (6 páginas)
    // ==========================================
    const totalPages = 6;

    // --- PÁGINA 1: CAPA & SUMÁRIO EXECUTIVO ---
    drawHeader(1, totalPages, 'DOSSIÊ ARQUITETURAL COMPLETO');

    let currentY = 28;

    // Badge Pro
    doc.setFillColor(15, 23, 42);
    doc.roundedRect(margin, currentY, 65, 6.5, 1, 1, 'F');
    doc.setTextColor(14, 165, 233);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('DOSSIÊ TÉCNICO & ORÇAMENTÁRIO', margin + 3, currentY + 4.5);

    currentY += 12;

    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Dossiê de Digitalização & Arquitetura', margin, currentY);

    currentY += 7;
    doc.setFontSize(12);
    doc.setTextColor(textDark.r, textDark.g, textDark.b);
    doc.text(`Setor: ${sector.name} // Nicho: ${input.specificNiche || sector.typicalNiches[0]}`, margin, currentY);

    if (lead?.companyName) {
      currentY += 6;
      doc.setFontSize(9.5);
      doc.setTextColor(14, 165, 233);
      doc.setFont('helvetica', 'bold');
      doc.text(`Elaborado sob medida para: ${lead.companyName} (Solicitante: ${lead.name || 'Decisor'})`, margin, currentY);
    }

    currentY += 12;

    // Quadro Geral de Premissas
    drawCard(margin, currentY, contentWidth, 36, [248, 250, 252], [203, 213, 225]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text('PREMISSAS DO DIAGNÓSTICO', margin + 5, currentY + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(textDark.r, textDark.g, textDark.b);
    doc.text(`• Porte Organizacional: ${sizeInfo.label} (${sizeInfo.badge})`, margin + 5, currentY + 15);
    doc.text(`• Maturidade Digital Atual: ${maturityInfo.label} - ${maturityInfo.summary}`, margin + 5, currentY + 21);
    doc.text(`• Objetivo Primário: ${goalInfo.label} (${goalInfo.description})`, margin + 5, currentY + 27);
    if (input.customRequirements) {
      doc.text(`• Requisitos Informados: "${input.customRequirements.substring(0, 75)}"`, margin + 5, currentY + 33);
    }

    currentY += 44;

    // Métricas Principais (4 Cards Grid)
    const cardGridW = (contentWidth - 6) / 2;

    // Capex
    drawCard(margin, currentY, cardGridW, 30, [255, 255, 255], [14, 165, 233]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(14, 165, 233);
    doc.text('INVESTIMENTO ESTIMADO (CAPEX)', margin + 5, currentY + 7);
    doc.setFontSize(14);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(`${formatCurrency(capexMin)} a ${formatCurrency(capexMax)}`, margin + 5, currentY + 16);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(textLight.r, textLight.g, textLight.b);
    doc.text('Desenvolvimento integral do sistema e testes', margin + 5, currentY + 23);

    // Opex
    drawCard(margin + cardGridW + 6, currentY, cardGridW, 30, [255, 255, 255], [16, 185, 129]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(16, 185, 129);
    doc.text('CUSTO OPERACIONAL MENSAL (OPEX)', margin + cardGridW + 11, currentY + 7);
    doc.setFontSize(14);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(`${formatCurrency(opexMonthlyMin)} a ${formatCurrency(opexMonthlyMax)} /mês`, margin + cardGridW + 11, currentY + 16);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(textLight.r, textLight.g, textLight.b);
    doc.text('Custos de nuvem gerenciada, backup e APIs', margin + cardGridW + 11, currentY + 23);

    currentY += 36;

    // Cronograma
    drawCard(margin, currentY, cardGridW, 30, [255, 255, 255], [203, 213, 225]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(textLight.r, textLight.g, textLight.b);
    doc.text('CRONOGRAMA DE ROLLOUT', margin + 5, currentY + 7);
    doc.setFontSize(14);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(`${timelineWeeksMin} a ${timelineWeeksMax} Semanas`, margin + 5, currentY + 16);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(textLight.r, textLight.g, textLight.b);
    doc.text(`Total estimado de ${assessment.sprintsCount} sprints ágeis quinzenais`, margin + 5, currentY + 23);

    // Squad
    drawCard(margin + cardGridW + 6, currentY, cardGridW, 30, [255, 255, 255], [203, 213, 225]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(textLight.r, textLight.g, textLight.b);
    doc.text('EQUIPE RECOMENDADA', margin + cardGridW + 11, currentY + 7);
    doc.setFontSize(14);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(`${assessment.recommendedSquad.length} Especialistas`, margin + cardGridW + 11, currentY + 16);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(textLight.r, textLight.g, textLight.b);
    doc.text('Engenheiros, Arquiteto e Analista de Qualidade', margin + cardGridW + 11, currentY + 23);

    currentY += 38;

    // Visão Geral da Transformação
    drawCard(margin, currentY, contentWidth, 34, [248, 250, 252], [226, 232, 240]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text('RESUMO DO IMPACTO OPERACIONAL', margin + 5, currentY + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(textDark.r, textDark.g, textDark.b);
    const summaryText =
      `A modernização planejada visa substituir ${maturityInfo.label.toLowerCase()} por uma infraestrutura ` +
      `escalável baseada em ${sector.recommendedBackend.split(' ')[0]} e ${sector.recommendedFrontend.split(' ')[0]}. ` +
      `Isso elimina gargalos de retrabalho manual, protege a operação contra perda de dados e prepara a empresa para ` +
      `crescimento sustentável sem aumento proporcional de custos operacionais.`;
    const splitSummary = doc.splitTextToSize(summaryText, contentWidth - 10);
    doc.text(splitSummary, margin + 5, currentY + 16);

    // --- PÁGINA 2: JUSTIFICATIVA TÉCNICA E ARQUITETURA ---
    doc.addPage();
    drawHeader(2, totalPages, 'ARQUITETURA DE SOFTWARE & STACKS');

    currentY = 28;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text('Especificação Arquitetural e Seleção de Tecnologias', margin, currentY);

    currentY += 8;

    const layers = [
      {
        title: '1. Camada de Frontend & Experiência do Usuário (UI/UX)',
        tech: sector.recommendedFrontend,
        detail:
          'Responsável pela interface do usuário, velocidade de carregamento, responsividade mobile e conformidade ' +
          'com padrões modernos de acessibilidade. Garante adoção intuitiva pelos colaboradores e clientes.'
      },
      {
        title: '2. Camada de Backend & Regras de Negócio (APIs)',
        tech: sector.recommendedBackend,
        detail:
          'Processamento central, validação de regras fiscais/contábeis, autenticação OAuth2/JWT e barramento de ' +
          'integração com mensageria. Desenvolvido sob arquitetura RESTful/gRPC com documentação OpenAPI/Swagger.'
      },
      {
        title: '3. Camada de Persistência & Cache em Memória',
        tech: sector.recommendedDatabase,
        detail:
          'Banco relacional com índices otimizados (B-Tree/GIN), particionamento de tabelas históricas e cache-aside ' +
          'com Redis para reduzir o tempo de resposta das consultas frequentes em mais de 80%.'
      },
      {
        title: '4. Infraestrutura em Nuvem & DevOps',
        tech: sector.recommendedCloud,
        detail:
          'Provisionamento como código (Terraform), contêineres Docker, rotinas diárias automatizadas de backup e ' +
          'monitoramento contínuo de métricas de CPU, latência e disponibilidade com alertas.'
      }
    ];

    layers.forEach((layer) => {
      drawCard(margin, currentY, contentWidth, 32, [255, 255, 255], [226, 232, 240]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
      doc.text(layer.title, margin + 5, currentY + 7);

      doc.setFontSize(9);
      doc.setTextColor(14, 165, 233);
      doc.text(`Tecnologia Indicada: ${layer.tech}`, margin + 5, currentY + 14);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(textDark.r, textDark.g, textDark.b);
      const splitDetail = doc.splitTextToSize(layer.detail, contentWidth - 10);
      doc.text(splitDetail, margin + 5, currentY + 20);

      currentY += 36;
    });

    currentY += 4;
    // Destaque arquitetural caixa cinza
    drawCard(margin, currentY, contentWidth, 26, [248, 250, 252], [203, 213, 225]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text('PADRÃO ARQUITETURAL RECOMENDADO', margin + 5, currentY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(textDark.r, textDark.g, textDark.b);
    const splitHighlight2 = doc.splitTextToSize(sector.architectureHighlight, contentWidth - 10);
    doc.text(splitHighlight2, margin + 5, currentY + 14);

    // --- PÁGINA 3: BREAKDOWN FINANCEIRO & SQUAD ---
    doc.addPage();
    drawHeader(3, totalPages, 'BREAKDOWN DE CUSTOS & EQUIPE');

    currentY = 28;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text('Detalhamento do Investimento por Fase de Engenharia', margin, currentY);

    currentY += 8;

    // Tabela de Breakdown
    // Header tabela
    doc.setFillColor(15, 23, 42);
    doc.rect(margin, currentY, contentWidth, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('Fase / Disciplina', margin + 4, currentY + 5.5);
    doc.text('Horas', margin + 95, currentY + 5.5);
    doc.text('%', margin + 115, currentY + 5.5);
    doc.text('Faixa Estimada (R$)', pageWidth - margin - 4, currentY + 5.5, { align: 'right' });

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
      doc.text(item.category, margin + 4, currentY + 5.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(textLight.r, textLight.g, textLight.b);
      doc.text(item.description.substring(0, 75), margin + 4, currentY + 10.5);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(textDark.r, textDark.g, textDark.b);
      doc.text(`${item.hours}h`, margin + 95, currentY + 7);
      doc.text(`${item.percentage}%`, margin + 115, currentY + 7);

      doc.setTextColor(14, 165, 233);
      doc.text(`${formatCurrency(item.estimatedCostMin)} - ${formatCurrency(item.estimatedCostMax)}`, pageWidth - margin - 4, currentY + 7, { align: 'right' });

      currentY += 14;
    });

    currentY += 10;

    // Alocação de Squad
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text('Composição Recomendada do Squad de Desenvolvimento', margin, currentY);

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
      doc.text(`Alocação: ${member.allocation} | Quantidade: ${member.count}`, pageWidth - margin - 5, currentY + 7.5, { align: 'right' });

      currentY += 15;
    });

    // --- PÁGINA 4: CRONOGRAMA DE SPRINTS ---
    doc.addPage();
    drawHeader(4, totalPages, 'CRONOGRAMA DE ROLLOUT & SPRINTS');

    currentY = 28;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(`Cronograma Faseado em Sprints (${timelineWeeksMin} a ${timelineWeeksMax} Semanas)`, margin, currentY);

    currentY += 8;

    assessment.rolloutPhases.forEach((phase, idx) => {
      drawCard(margin, currentY, contentWidth, 38, [255, 255, 255], [203, 213, 225]);

      // Barra colorida lateral
      const colors = [[14, 165, 233], [99, 102, 241], [16, 185, 129]];
      const chosenColor = colors[idx % colors.length];
      doc.setFillColor(chosenColor[0], chosenColor[1], chosenColor[2]);
      doc.rect(margin, currentY, 3.5, 38, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
      doc.text(phase.phase, margin + 7, currentY + 8);

      doc.setFontSize(8.5);
      doc.setTextColor(chosenColor[0], chosenColor[1], chosenColor[2]);
      doc.text(`Duração Estimada: ${phase.duration}`, pageWidth - margin - 5, currentY + 8, { align: 'right' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(textDark.r, textDark.g, textDark.b);

      phase.deliverables.forEach((deliv, dIdx) => {
        doc.text(`✓ ${deliv}`, margin + 7, currentY + 16 + dIdx * 6);
      });

      currentY += 44;
    });

    currentY += 4;
    drawCard(margin, currentY, contentWidth, 24, [248, 250, 252], [226, 232, 240]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text('METODOLOGIA DE GO-LIVE PROGRESSIVO', margin + 5, currentY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textDark.r, textDark.g, textDark.b);
    const rolloutNotes =
      'Recomendamos a estratégia de lançamento em "Canary Release" ou pilotos em grupos fechados de colaboradores ' +
      'antes da virada total da operação, garantindo que qualquer ajuste em regras de negócio seja realizado sem impacto ' +
      'no atendimento ao cliente ou faturamento.';
    const splitNotes = doc.splitTextToSize(rolloutNotes, contentWidth - 10);
    doc.text(splitNotes, margin + 5, currentY + 13);

    // --- PÁGINA 5: SIMULAÇÃO CLOUD & MATRIZ DE RISCOS ---
    doc.addPage();
    drawHeader(5, totalPages, 'SIMULAÇÃO CLOUD & MATRIZ DE RISCOS');

    currentY = 28;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(`Dimensionamento Cloud: ${assessment.cloudSimulation.provider}`, margin, currentY);

    currentY += 6;
    drawCard(margin, currentY, contentWidth, 36, [248, 250, 252], [14, 165, 233]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(14, 165, 233);
    doc.text(`Plano Sugerido: ${assessment.cloudSimulation.tier}`, margin + 5, currentY + 7);

    doc.setFontSize(12);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(`Custo Previsto: ${formatCurrency(assessment.cloudSimulation.estimatedMonthlyBrl)} /mês`, pageWidth - margin - 5, currentY + 7, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textDark.r, textDark.g, textDark.b);
    doc.text('Serviços Gerenciados Inclusos na Arquitetura:', margin + 5, currentY + 14);

    assessment.cloudSimulation.services.forEach((srv, sIdx) => {
      doc.text(`• ${srv}`, margin + 5, currentY + 20 + sIdx * 3.8);
    });

    currentY += 44;

    // Matriz de Riscos
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text('Matriz de Riscos Estratégicos & Planos de Mitigação', margin, currentY);

    currentY += 6;

    assessment.strategicRisks.forEach((risk) => {
      drawCard(margin, currentY, contentWidth, 24, [255, 255, 255], [226, 232, 240]);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
      doc.text(risk.risk, margin + 5, currentY + 7);

      const impactColor = risk.impact === 'Alto' ? [239, 68, 68] : risk.impact === 'Médio' ? [245, 158, 11] : [16, 185, 129];
      doc.setFillColor(impactColor[0], impactColor[1], impactColor[2]);
      doc.roundedRect(pageWidth - margin - 25, currentY + 3.5, 20, 5, 1, 1, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7.5);
      doc.text(`Impacto ${risk.impact}`, pageWidth - margin - 15, currentY + 7, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(textDark.r, textDark.g, textDark.b);
      const splitMitigation = doc.splitTextToSize(`Ação Mitigadora: ${risk.mitigation}`, contentWidth - 10);
      doc.text(splitMitigation, margin + 5, currentY + 14);

      currentY += 28;
    });

    // --- PÁGINA 6: CONFORMIDADE LGPD & PRÓXIMOS PASSOS ---
    doc.addPage();
    drawHeader(6, totalPages, 'LGPD, GOVERNANÇA & PRÓXIMOS PASSOS');

    currentY = 28;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text('Checklist de Segurança & Conformidade Legal (LGPD)', margin, currentY);

    currentY += 8;

    assessment.complianceChecklist.forEach((item) => {
      drawCard(margin, currentY, contentWidth, 12, [255, 255, 255], [226, 232, 240]);
      doc.setFillColor(16, 185, 129);
      doc.circle(margin + 5, currentY + 6, 1.5, 'F');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(textDark.r, textDark.g, textDark.b);
      doc.text(item, margin + 10, currentY + 7.5);

      currentY += 15;
    });

    currentY += 8;

    // Próximos Passos
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text('Próximos Passos para Viabilizar seu Projeto', margin, currentY);

    currentY += 6;
    drawCard(margin, currentY, contentWidth, 34, [248, 250, 252], [203, 213, 225]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(textDark.r, textDark.g, textDark.b);

    const steps = [
      '1. Validação de Escopo: Refinar os requisitos específicos com os stakeholders de operação e finanças.',
      '2. Prova de Conceito (PoC): Implementar um protótipo navegável em 10 dias úteis para validação visual.',
      '3. Contratação e Alocação da Squad: Definir se a equipe será interna, terceirizada ou modelo híbrido.',
      '4. Kickoff da Sprint 1: Setup do repositório, pipeline CI/CD e banco de dados na nuvem.'
    ];

    steps.forEach((step, sIdx) => {
      doc.text(step, margin + 5, currentY + 8 + sIdx * 6);
    });

    currentY += 42;

    // Box Final de Contato Corporativo
    drawCard(margin, currentY, contentWidth, 34, [15, 23, 42], [15, 23, 42]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text('CodeCompare // Consultoria & Engenharia de Software Especializada', margin + 6, currentY + 9);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(203, 213, 225);
    doc.text(
      'Gostou da análise e gostaria de tirar esse projeto do papel com profissionais sêniores?',
      margin + 6,
      currentY + 16
    );
    doc.text(
      'Oferecemos suporte completo em arquitetura, código sob medida e mentoria para sua equipe.',
      margin + 6,
      currentY + 22
    );

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(14, 165, 233);
    doc.text('E-mail: eduardolessa2011@gmail.com  |  Portal: https://www.devedulessa.com.br/', margin + 6, currentY + 28);
  }

  // Download do PDF
  const filename =
    mode === 'preview'
      ? `CodeCompare_Preview_${sector.id}.pdf`
      : `CodeCompare_Dossie_Completo_${sector.id}.pdf`;

  doc.save(filename);
}
