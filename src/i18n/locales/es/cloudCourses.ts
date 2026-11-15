import { CloudCoursesLocale } from '../../types.ts';

const cloudCoursesEs: CloudCoursesLocale = {
  cloudUi: {
    updatedLabel: 'Actualizado 2024/2025',
    awsBadgeLabel: 'AWS',
    azureBadgeLabel: 'Microsoft Azure',
    vsLabel: 'vs',
    titleBefore: 'Comparativa Cloud:',
    titleVs: 'vs',
    subtitle:
      'Análisis técnico imparcial y práctico entre las dos mayores plataformas cloud del mundo para las necesidades reales de ingeniería: Almacenamiento, Deploy, CI/CD y Serverless Functions.',
    pillarStorageTitle: 'Almacenamiento',
    pillarStorageSub: 'S3 vs Blob • EBS vs Managed Disks',
    pillarDeployTitle: 'Deploy & Contenedores',
    pillarDeploySub: 'ECS / App Runner vs Container Apps',
    pillarCicdTitle: 'Pipelines CI / CD',
    pillarCicdSub: 'CodePipeline vs GitHub Actions / DevOps',
    pillarFunctionsTitle: 'Functions (Serverless)',
    pillarFunctionsSub: 'AWS Lambda vs Azure Functions',
    winnerLabel: 'Ventaja:',
    winnerTie: 'Empate Técnico',
    keyFeaturesLabel: 'Capacidades Clave',
    strengthsLabel: 'Puntos Fuertes',
    weaknessesLabel: 'Puntos de Atención / Límites',
    pricingLabel: 'Modelo de Precios Base:',
    hideCodeLabel: 'Ocultar Fragmento de Infraestructura / Código',
    viewCodeLabel: 'Ver Fragmento de Infraestructura / Código Comparado',
    deepDiveTagSuffix: 'IaC & Código',
    awsShortBadge: 'AWS',
    azureShortBadge: 'Azure',
    defaultAwsCodeTitle: 'Ejemplo AWS',
    defaultAzureCodeTitle: 'Ejemplo Azure',
    metricsTitle: 'Comparativa de Métricas Operativas',
    metricLatency: 'Latencia',
    metricScalability: 'Escalabilidad',
    metricDx: 'Developer Experience',
    metricEcosystem: 'Ecosistema & Integración',
    deepDiveLabel: 'Análisis Profundo:',
    verdictSummaryLabel: 'Veredicto Ejecutivo',
    whenAwsLabel: 'Cuándo elegir AWS:',
    whenAzureLabel: 'Cuándo elegir Azure:',
    simulatorBadge: 'Simulador de Arquitectura Cloud',
    simulatorTitle: '¿Qué nube elegir para tu escenario real?',
    simulatorSubtitle:
      'Selecciona uno de los workloads siguientes para comparar la arquitectura recomendada lado a lado en AWS y Microsoft Azure.',
    activeScenarioLabel: 'Escenario Activo',
    simulateStackLabel: 'Simular Stack',
    awsStackHeader: 'Arquitectura Recomendada • AWS',
    azureStackHeader: 'Arquitectura Recomendada • Microsoft Azure',
    awsNotesLabel: 'Notas de Arquitectura AWS:',
    azureNotesLabel: 'Notas de Arquitectura Azure:',
    workloadConcurrency: 'Concurrencia:',
    workloadDatabase: 'Base de Datos:',
    workloadFramework: 'Framework / Stack:',
    workloadCompliance: 'Cumplimiento:',
    computeLabel: 'Cómputo / Deploy',
    storageLabel: 'Almacenamiento / Datos',
    cicdLabel: 'CI / CD & Pipelines',
    functionsLabel: 'Serverless Functions',
    networkingLabel: 'Red & Seguridad',
    costEstimateLabel: 'Estimación de Costo:',
    rationaleTitle: 'Racional de Decisión (¿Por qué elegir?)',
    mappingTable: {
      title: 'Tabla Rápida de Equivalencia: AWS ⇄ Microsoft Azure',
      subtitle: 'Guía de bolsillo para arquitectos e ingenieros que trabajan entre ambos proveedores.',
      colDomain: 'Dominio / Necesidad',
      colAws: 'Amazon Web Services (AWS)',
      colAzure: 'Microsoft Azure',
      colDiff: 'Diferencial Clave',
      rows: [
        {
          domain: 'Object Storage (Archivos)',
          aws: 'Amazon S3',
          azure: 'Azure Blob Storage (ADLS Gen2)',
          diff: 'S3 lidera en estandarización; Blob ofrece menor costo/GB en Hot y directorios nativos.'
        },
        {
          domain: 'Block Storage (Discos VM)',
          aws: 'Amazon EBS (gp3 / io2)',
          azure: 'Azure Managed Disks (Premium v2 / Ultra)',
          diff: 'gp3 desacopla IOPS del tamaño en toda región; Azure aporta discos Shared y ZRS.'
        },
        {
          domain: 'Contenedores Serverless',
          aws: 'Amazon ECS (Fargate) / App Runner',
          azure: 'Azure Container Apps (ACA)',
          diff: 'ACA integra KEDA y escala a 0 réplicas sin costo cuando está inactivo.'
        },
        {
          domain: 'PaaS Web Clásico',
          aws: 'Elastic Beanstalk / App Runner',
          azure: 'Azure App Service',
          diff: 'App Service incluye Deployment Slots para swap instantáneo Staging ⇄ Producción.'
        },
        {
          domain: 'Pipelines CI / CD',
          aws: 'CodePipeline / CodeBuild',
          azure: 'GitHub Actions / Azure DevOps',
          diff: 'GitHub Actions (Microsoft) lidera en DX con autenticación federada OIDC.'
        },
        {
          domain: 'Functions Serverless',
          aws: 'AWS Lambda',
          azure: 'Azure Functions',
          diff: 'Lambda escala hasta 3k/min; Azure destaca por Durable Functions y bindings declarativos.'
        },
        {
          domain: 'Kubernetes Gestionado',
          aws: 'Amazon EKS',
          azure: 'Azure Kubernetes Service (AKS)',
          diff: 'El Control Plane de EKS cuesta $73/mes; el estándar de AKS es gratuito.'
        }
      ]
    },
    ctaBadge: 'Siguiente Paso Práctico',
    ctaDecisionTitle: '¿Quieres combinar tu elección Cloud con el Framework ideal?',
    ctaDecisionDesc:
      'Usa nuestra Matriz de Decisión Arquitectónica o simula el presupuesto completo en la sección Business.',
    ctaDecisionBtn: 'Abrir Matriz de Decisión',
    ctaBusinessBtn: 'Simular Presupuesto (Business)'
  },
  cloudCategories: [
    { id: 'all', label: 'Visión General' },
    { id: 'storage', label: '1. Almacenamiento (Storage)' },
    { id: 'deploy', label: '2. Deploy & Hosting' },
    { id: 'cicd', label: '3. CI / CD & Automatización' },
    { id: 'functions', label: '4. Functions (Serverless)' },
    { id: 'scenarios', label: 'Simulador de Arquitecturas' }
  ],
  cloudComparisons: [
    {
      category: 'storage',
      title: 'Object Storage: Amazon S3 vs Azure Blob Storage',
      subtitle: 'Almacenamiento de objetos no estructurados, Data Lakes, assets estáticos y respaldos.',
      aws: {
        serviceName: 'Amazon S3 (Simple Storage Service)',
        icon: 'AWS-S3',
        keyFeatures: [
          'Consistencia fuerte read-after-write para PUT y DELETE',
          'Capas: Standard, Intelligent-Tiering, Standard-IA, One Zone-IA y Glacier',
          'URLs prefirmadas con expiración granular',
          'S3 Object Lambda para transformación al vuelo',
          'Replicación entre regiones (CRR) y en la misma región (SRR)'
        ],
        strengths: [
          'Estándar absoluto de la industria con SDKs universales',
          'Intelligent-Tiering mueve objetos sin cargos sorpresa de recuperación',
          'Throughput masivo para Data Lakes'
        ],
        weaknesses: [
          'Costo elevado de transferencia de salida (Data Egress)',
          'Políticas IAM y ACLs heredadas requieren auditoría continua'
        ],
        pricingModel: '$0.023/GB (Standard primeros 50 TB) + $0.005 por 1.000 PUT + egress',
        codeSampleTitle: 'Subida con URL Prefirmada en Node.js (AWS SDK v3)',
        codeSampleLang: 'typescript',
        codeSample: `import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "us-east-1" });

export async function generateUploadUrl(fileName: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: "empresa-assets-prod",
    Key: \`uploads/\${Date.now()}-\${fileName}\`,
    ContentType: contentType,
  });

  return await getSignedUrl(s3, command, { expiresIn: 900 });
}`
      },
      azure: {
        serviceName: 'Azure Blob Storage (Azure Storage)',
        icon: 'Azure-Blob',
        keyFeatures: [
          'Jerarquía con Storage Accounts y Containers',
          'Capas: Hot, Cool, Cold y Archive con políticas de ciclo de vida',
          'SAS Tokens delegados mediante Microsoft Entra ID',
          'Azure Data Lake Storage Gen2 (ADLSv2) con espacio de nombres jerárquico',
          'Geo-redundancia LRS, ZRS, GRS, GZRS y RA-GRS'
        ],
        strengths: [
          'Directorios reales en ADLSv2 aceleran operaciones atómicas analíticas',
          'Integración nativa con Microsoft Fabric, Synapse y .NET',
          'SAS delegados mediante Managed Identities sin claves maestras expuestas'
        ],
        weaknesses: [
          'Rehidratación desde Archive puede tardar hasta 15 horas',
          'Transiciones entre capas requieren planificar costos de escritura'
        ],
        pricingModel: '$0.018/GB (Hot primeros 50 TB) + $0.005 por 10.000 escrituras + egress',
        codeSampleTitle: 'Subida con SAS Token Delegado en C# (.NET 8)',
        codeSampleLang: 'csharp',
        codeSample: `using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using Azure.Identity;

var blobServiceClient = new BlobServiceClient(
    new Uri("https://mistorage.blob.core.windows.net"),
    new DefaultAzureCredential());

var containerClient = blobServiceClient.GetBlobContainerClient("documentos");
var blobClient = containerClient.GetBlobClient($"factura-{Guid.NewGuid()}.pdf");

var sasBuilder = new BlobSasBuilder
{
    BlobContainerName = containerClient.Name,
    BlobName = blobClient.Name,
    Resource = "b",
    ExpiresOn = DateTimeOffset.UtcNow.AddMinutes(15)
};
sasBuilder.SetPermissions(BlobSasPermissions.Write | BlobSasPermissions.Create);

var sasUri = blobClient.GenerateSasUri(sasBuilder);`
      },
      deepDiveAnalysis:
        'Ambos garantizan 99.999999999% de durabilidad y consistencia fuerte. S3 destaca por Intelligent-Tiering y soporte universal; Azure Blob destaca en analítica empresarial con ADLS Gen2 y menor tarifa base por GB.',
      verdict: {
        winner: 'tie',
        summary: 'Empate técnico. S3 ofrece compatibilidad universal; Azure Blob brinda directorios ADLS Gen2 y menor costo base Hot.',
        recommendedWhenAWS: 'Compatibilidad universal open-source, Terraform maduro o flujos con Lambda y Athena.',
        recommendedWhenAzure: 'Data Lakes jerárquicos (ADLSv2), Power BI/Synapse o gobierno unificado con Entra ID.'
      },
      metrics: {
        latency: { aws: '~10-15ms primer byte (Standard)', azure: '~12-18ms primer byte (Hot)' },
        scalability: { aws: '3.500 PUT/s y 5.500 GET/s por prefijo', azure: 'Hasta 20.000 ops/s por Storage Account' },
        developerExperience: { aws: 'Excelente (SDK v3 modular)', azure: 'Muy buena (DefaultAzureCredential)' },
        integrationEcosystem: { aws: 'Líder del mercado', azure: 'Fuerte en Microsoft 365 y Databricks' }
      }
    },
    {
      category: 'storage',
      title: 'Block Storage: AWS EBS vs Azure Managed Disks',
      subtitle: 'Volúmenes de bloque de baja latencia para bases de datos (PostgreSQL, SQL Server) e I/O intensivo.',
      aws: {
        serviceName: 'Amazon Elastic Block Store (EBS)',
        icon: 'AWS-EBS',
        keyFeatures: [
          'Tipos: gp3 configurable, io2 Block Express, st1 y sc1',
          'EBS gp3 desacopla IOPS (3.000 base a 16.000) y Throughput del tamaño',
          'io2 Block Express alcanza hasta 256.000 IOPS sub-milisegundo',
          'Snapshots incrementales directos en Amazon S3'
        ],
        strengths: [
          'gp3 entrega la mejor relación costo-rendimiento sin sobredimensionar capacidad',
          'Latencia predecible en microsegundos con io2'
        ],
        weaknesses: [
          'Volumen limitado a una única Zona de Disponibilidad (AZ)',
          'Cambios en vivo requieren esperar período de enfriamiento'
        ],
        pricingModel: 'gp3: $0.08/GB-mes (incluye 3.000 IOPS y 125 MB/s) + $0.005/IOPS extra',
        codeSampleTitle: 'Terraform EBS gp3 con IOPS aprovisionados',
        codeSampleLang: 'hcl',
        codeSample: `resource "aws_ebs_volume" "postgres_data" {
  availability_zone = "us-east-1a"
  size              = 100
  type              = "gp3"
  iops              = 6000
  throughput        = 250
  encrypted         = true
}`
      },
      azure: {
        serviceName: 'Azure Managed Disks',
        icon: 'Azure-Disks',
        keyFeatures: [
          'Premium SSD v2 desacopla IOPS y Throughput al estilo gp3',
          'Ultra Disk alcanza 160.000 IOPS por debajo de 1ms',
          'Shared Disks SCSI para clústeres WSFC y Pacemaker',
          'Zone Redundant Storage (ZRS) síncrono en múltiples zonas'
        ],
        strengths: [
          'Discos ZRS permiten conmutación por error entre zonas con el mismo volumen',
          'Ideal para SQL Server Always On FCI'
        ],
        weaknesses: [
          'Premium SSD v1 vincula IOPS al tamaño de disco'
        ],
        pricingModel: 'Premium SSD v2: ~$0.073/GB-mes + 3.000 IOPS base + $0.005/IOPS extra',
        codeSampleTitle: 'Plantilla Bicep para Premium SSD v2',
        codeSampleLang: 'bicep',
        codeSample: `resource postgresDataDisk 'Microsoft.Compute/disks@2023-10-02' = {
  name: 'disk-postgres-prod-01'
  location: resourceGroup().location
  sku: { name: 'PremiumV2_LRS' }
  properties: { diskSizeGB: 100, diskIOPSReadWrite: 6000, diskMBpsReadWrite: 250, creationData: { createOption: 'Empty' } }
}`
      },
      deepDiveAnalysis:
        'AWS marcó el estándar con EBS gp3 y Azure respondió con Premium SSD v2 más redundancia zonal ZRS y discos compartidos SCSI.',
      verdict: {
        winner: 'aws',
        summary: 'AWS gana por ligera ventaja gracias a la disponibilidad universal de gp3 y snapshots en S3.',
        recommendedWhenAWS: 'Servidores Linux y bases OLTP optimizando costo por IOPS con gp3.',
        recommendedWhenAzure: 'Clústeres corporativos Windows WSFC o discos ZRS multi-zona obligatorios.'
      },
      metrics: {
        latency: { aws: '0.8–1.5ms (gp3) / <0.5ms (io2)', azure: '1.0–2.0ms (Premium v2) / <1.0ms (Ultra)' },
        scalability: { aws: 'Hasta 64 TB por volumen', azure: 'Hasta 64 TB por volumen' },
        developerExperience: { aws: 'Excelente', azure: 'Muy buena' },
        integrationEcosystem: { aws: 'EC2 Nitro, EKS CSI', azure: 'Azure VMs, AKS CSI' }
      }
    },
    {
      category: 'deploy',
      title: 'Hosting & Contenedores: AWS (App Runner / ECS) vs Azure (Container Apps / App Service)',
      subtitle: 'Despliegue de APIs REST, microservicios en Docker y aplicaciones web elásticas.',
      aws: {
        serviceName: 'AWS App Runner & Amazon ECS (Fargate)',
        icon: 'AWS-ECS',
        keyFeatures: [
          'App Runner construye y despliega desde Git o ECR',
          'ECS Fargate sin gestión de nodos Kubernetes',
          'Task IAM Roles aisladas por contenedor',
          'Integración directa con ALB y AWS WAF'
        ],
        strengths: [
          'Más simple y predecible que Kubernetes para el 80% de empresas',
          'Hasta 70% de ahorro con Savings Plans y Fargate Spot'
        ],
        weaknesses: [
          'App Runner no escala a cero completo'
        ],
        pricingModel: 'Fargate: ~$0.04048/vCPU-h + $0.004445/GB-h',
        codeSampleTitle: 'Task Definition ECS en JSON',
        codeSampleLang: 'json',
        codeSample: `{
  "family": "api-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [{ "name": "api-container", "image": "123456789.dkr.ecr.us-east-1.amazonaws.com/api:latest", "essential": true }]
}`
      },
      azure: {
        serviceName: 'Azure Container Apps (ACA) & Azure App Service',
        icon: 'Azure-ACA',
        keyFeatures: [
          'Container Apps con KEDA integrado y escala a CERO real',
          'App Service con Deployment Slots (Staging ➔ Producción sin downtime)',
          'Soporte nativo para Dapr y Envoy Proxy'
        ],
        strengths: [
          'Escala a 0 réplicas sin costo cuando está inactivo',
          'Deployment Slots es el mejor mecanismo de release seguro del mercado'
        ],
        weaknesses: [
          'Cold start al despertar de 0 a 1 réplica en ACA'
        ],
        pricingModel: 'ACA: 180k vCPU-s y 360k GB-s gratis/mes; luego ~$0.000024/vCPU-s',
        codeSampleTitle: 'Bicep para Azure Container Apps con escala a cero',
        codeSampleLang: 'bicep',
        codeSample: `resource containerApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: 'api-backend-app'
  location: resourceGroup().location
  properties: {
    managedEnvironmentId: acaEnv.id
    template: { scale: { minReplicas: 0, maxReplicas: 10 } }
  }
}`
      },
      deepDiveAnalysis:
        'ECS Fargate brilla en estabilidad operativa continua; Azure lidera en experiencia moderna con ACA (KEDA + escala a cero) y Deployment Slots.',
      verdict: {
        winner: 'azure',
        summary: 'Azure vence para nuevas apps en contenedores por escala a cero con KEDA y Deployment Slots.',
        recommendedWhenAWS: 'Servicios continuos que requieren máxima simplicidad operativa en Fargate.',
        recommendedWhenAzure: 'Ahorro en microservicios intermitentes, KEDA por colas o ecosistema .NET.'
      },
      metrics: {
        latency: { aws: 'ALB ~1–3ms extra', azure: 'Envoy ~2–4ms extra' },
        scalability: { aws: 'Escalado en ~30–60s', azure: 'KEDA escala por colas en segundos' },
        developerExperience: { aws: 'Media', azure: 'Excelente' },
        integrationEcosystem: { aws: 'IAM, CloudWatch, ECR', azure: 'Entra ID, Log Analytics, ACR' }
      }
    },
    {
      category: 'cicd',
      title: 'CI / CD: AWS CodePipeline / CodeBuild vs Azure DevOps / GitHub Actions',
      subtitle: 'Automatización de pruebas, construcción Docker y entrega continua.',
      aws: {
        serviceName: 'AWS CodePipeline, CodeBuild & CodeDeploy',
        icon: 'AWS-CodePipeline',
        keyFeatures: [
          'CodeBuild efêmero con Docker-in-Docker',
          'CodeDeploy Blue/Green con rollback automático por alarmas CloudWatch',
          'Ejecución privada dentro de la VPC'
        ],
        strengths: [
          'Aislamiento de red dentro de VPC privada',
          'Rollbacks automáticos guiados por métricas'
        ],
        weaknesses: [
          'UX anticuada frente a GitHub Actions',
          'Descontinuación gradual de CodeCommit para nuevas cuentas'
        ],
        pricingModel: '$1.00/pipeline activo/mes + $0.005/minuto en CodeBuild',
        codeSampleTitle: 'GitHub Actions con AWS OIDC',
        codeSampleLang: 'yaml',
        codeSample: `permissions:
  id-token: write
  contents: read
steps:
  - uses: aws-actions/configure-aws-credentials@v4
    with:
      role-to-assume: arn:aws:iam::123456789:role/GitHubActionsECSRole
      aws-region: us-east-1`
      },
      azure: {
        serviceName: 'Azure DevOps Pipelines & GitHub Actions',
        icon: 'Azure-DevOps',
        keyFeatures: [
          'Runners híbridos Linux, Windows y macOS',
          'Mayor marketplace de acciones del mundo (GitHub Actions)',
          'OIDC con Entra ID sin secretos fijos'
        ],
        strengths: [
          'Experiencia de desarrollo muy superior',
          'Trazabilidad total commit ➔ PR ➔ despliegue'
        ],
        weaknesses: [
          'Runners de macOS/Windows consumen minutos multiplicados'
        ],
        pricingModel: 'GitHub: 2.000 min/mes gratis; Azure DevOps: 1.800 min/mes gratis',
        codeSampleTitle: 'GitHub Actions con Azure OIDC',
        codeSampleLang: 'yaml',
        codeSample: `permissions:
  id-token: write
  contents: read
steps:
  - uses: azure/login@v2
    with:
      client-id: \${{ secrets.AZURE_CLIENT_ID }}
      tenant-id: \${{ secrets.AZURE_TENANT_ID }}
      subscription-id: \${{ secrets.AZURE_SUBSCRIPTION_ID }}`
      },
      deepDiveAnalysis:
        'Incluso equipos 100% AWS prefieren GitHub Actions con OIDC frente a CodePipeline. Al ser parte de Microsoft, GitHub Actions y Azure DevOps dominan la entrega continua.',
      verdict: {
        winner: 'azure',
        summary: 'Victoria clara de Microsoft con GitHub Actions y Azure DevOps en DX y ecosistema.',
        recommendedWhenAWS: 'Combina GitHub Actions con AWS OIDC en lugar de pipelines nativos antiguos.',
        recommendedWhenAzure: 'Usa GitHub Actions o Azure DevOps con trazabilidad completa.'
      },
      metrics: {
        latency: { aws: 'Arranque CodeBuild ~20–40s', azure: 'Arranque GitHub Actions ~5–15s' },
        scalability: { aws: 'Por cuotas de cuenta', azure: 'Runners efímeros masivos' },
        developerExperience: { aws: 'Baja a Media', azure: 'Excelente' },
        integrationEcosystem: { aws: 'Enfocado en AWS', azure: 'Universal multi-cloud' }
      }
    },
    {
      category: 'functions',
      title: 'Serverless Functions: AWS Lambda vs Azure Functions',
      subtitle: 'Cómputo orientado a eventos, APIs ligeras, pipelines y orquestaciones.',
      aws: {
        serviceName: 'AWS Lambda',
        icon: 'AWS-Lambda',
        keyFeatures: [
          'Runtimes Node.js 20, Python 3.12, Java 21, .NET 8, Go',
          'SnapStart para mitigar cold starts',
          'Contenedores hasta 10 GB e integración con más de 200 servicios AWS'
        ],
        strengths: [
          'Aislamiento con microVM Firecracker y cold starts <150ms en Node/Python',
          'Escalado explosivo de miles de instancias por minuto'
        ],
        weaknesses: [
          'Límite máximo de ejecución de 15 minutos'
        ],
        pricingModel: '1M de peticiones y 400.000 GB-s gratis cada mes; luego $0.20/1M',
        codeSampleTitle: 'Handler AWS Lambda en Python',
        codeSampleLang: 'python',
        codeSample: `@app.get("/pedidos/<pedido_id>")
def get_pedido(pedido_id: str):
    return {"id": pedido_id, "status": "Procesado", "total": 149.90}`
      },
      azure: {
        serviceName: 'Azure Functions',
        icon: 'Azure-Functions',
        keyFeatures: [
          '.NET 8 Isolated Worker con Native AOT (<50ms arranque)',
          'Plan Flex Consumption con integración VNet y escala a cero',
          'Bindings declarativos y Durable Functions con estado'
        ],
        strengths: [
          'Durable Functions simplifican flujos complejos en código real',
          'Bindings reducen 50% del código repetitivo'
        ],
        weaknesses: [
          'Cold starts en Consumption clásico con Java pueden ser mayores'
        ],
        pricingModel: '1M de peticiones y 400.000 GB-s gratis/mes',
        codeSampleTitle: 'Azure Function .NET 8 con Output Binding',
        codeSampleLang: 'csharp',
        codeSample: `[Function("ProcesarPedido")]
public PedidoOutput Run([HttpTrigger(AuthorizationLevel.Function, "post", Route = "pedidos")] HttpRequestData req)
{
    var pedido = new Pedido { Id = Guid.NewGuid().ToString(), Status = "Aprobado" };
    return new PedidoOutput { FilaMessage = pedido };
}`
      },
      deepDiveAnalysis:
        'Lambda lidera en throughput por evento con EventBridge; Azure Functions destaca por Durable Functions y bindings declarativos.',
      verdict: {
        winner: 'tie',
        summary: 'Empate de alto nivel. Lambda para eventos EDA/DynamoDB; Azure Functions para Durable workflows y .NET 8.',
        recommendedWhenAWS: 'Microservicios puros orientados a eventos con EventBridge, Kinesis y DynamoDB.',
        recommendedWhenAzure: 'Orquestaciones largas con Durable Functions o backends .NET 8.'
      },
      metrics: {
        latency: { aws: '~120ms Node / ~180ms Python', azure: '~150ms Node / ~35ms .NET AOT' },
        scalability: { aws: 'Burst hasta 3.000 instancias/min', azure: 'KEDA + Flex Consumption' },
        developerExperience: { aws: 'Excelente (SAM / CDK)', azure: 'Excelente (VS Code Core Tools)' },
        integrationEcosystem: { aws: 'EventBridge, SQS, DynamoDB', azure: 'Event Grid, Service Bus, Cosmos DB' }
      }
    }
  ],
  cloudScenarios: [
    {
      id: 'enterprise-dotnet',
      title: 'Plataforma Corporativa .NET 8 & SQL Transacional',
      badge: 'Enterprise • Alta Confiabilidad',
      description: 'ERP/financiero con reglas densas, SSO corporativo y lanzamientos sin tiempo de inactividad.',
      workloadCharacteristics: {
        concurrency: '5.000 usuarios concurrentes',
        database: 'Relacional ACID auditable',
        framework: 'ASP.NET Core 8 & React',
        compliance: 'GDPR/LGPD, SOC 2, retención 5 años'
      },
      awsStack: {
        compute: 'ECS Fargate con ALB multi-AZ',
        storage: 'EBS gp3 + S3 Object Lock para auditoría',
        cicd: 'GitHub Actions con AWS OIDC hacia ECR',
        functions: 'AWS Lambda (.NET 8) tras SQS',
        networking: 'VPC privada en 3 AZ + AWS WAF',
        estimatedCostTier: '$$$ (Medio-Alto por NAT Gateway y ALB)',
        architectureNotes: 'Muy resiliente; exige configurar roles IAM y Task Definitions.'
      },
      azureStack: {
        compute: 'Azure App Service (Premium v3) con Deployment Slots o Container Apps',
        storage: 'Azure SQL Managed Instance + Blob Storage inmutable',
        cicd: 'Azure DevOps / GitHub Actions integrado con Entra ID',
        functions: 'Azure Functions (.NET 8) + Durable Functions',
        networking: 'Azure VNet con Private Endpoints + Front Door WAF',
        estimatedCostTier: '$$$ (Competitivo gracias a Azure Hybrid Benefit)',
        architectureNotes: 'Hogar natural para equipos .NET con cero downtime en slots.'
      },
      decisionRationale:
        'Azure aporta ventaja decisiva en pilas .NET gracias a Azure Hybrid Benefit, Entra ID nativo y Deployment Slots.'
    },
    {
      id: 'python-ai-async',
      title: 'API de Procesamiento de Datos & IA en Python',
      badge: 'Data Science • Machine Learning',
      description: 'Ingesta masiva de documentos, vectorización semántica (RAG) e inferencia con LLMs.',
      workloadCharacteristics: {
        concurrency: 'Picos con carga intensiva de CPU/GPU',
        database: 'pgvector / almacenamiento vectorial nativo',
        framework: 'FastAPI (Python 3.12) + Celery',
        compliance: 'Aislamiento de datos y cifrado en tránsito'
      },
      awsStack: {
        compute: 'ECS Fargate con GPU G5 + App Runner para FastAPI',
        storage: 'Amazon S3 + S3 Express One Zone',
        cicd: 'GitHub Actions hacia Amazon ECR',
        functions: 'AWS Lambda en contenedor de 10 GB + Step Functions',
        networking: 'VPC con Endpoints privados hacia S3 y DynamoDB',
        estimatedCostTier: '$$$$ (Alto por GPUs e I/O)',
        architectureNotes: 'Líder en tooling ML open-source con Bedrock y SageMaker.'
      },
      azureStack: {
        compute: 'Azure Container Apps con perfiles GPU dedicados',
        storage: 'Azure Blob Storage con ADLS Gen2',
        cicd: 'GitHub Actions integrado a ACR',
        functions: 'Azure Functions Python con KEDA',
        networking: 'VNet privada conectada a Azure OpenAI Service',
        estimatedCostTier: '$$$$ (Excelente para consumo privado de GPT-4o)',
        architectureNotes: 'Ventaja clave cuando se requiere Azure OpenAI privado bajo mismo tenant.'
      },
      decisionRationale:
        'Elige Azure si exiges privacidad corporativa sobre Azure OpenAI; elige AWS para entrenamiento propio y pipelines Big Data.'
    },
    {
      id: 'serverless-web-spa',
      title: 'Portal Web Moderno & APIs Serverless Elásticas',
      badge: 'Web Moderna • Escala Elástica',
      description: 'Aplicación SPA global con caché en el borde y backend 100% serverless con costo cero inactivo.',
      workloadCharacteristics: {
        concurrency: '0 a 100.000 peticiones/minuto',
        database: 'NoSQL baja latencia (DynamoDB vs Cosmos DB)',
        framework: 'React / Next.js + TypeScript',
        compliance: 'PCI-DSS y GDPR/LGPD'
      },
      awsStack: {
        compute: 'CloudFront CDN + S3 + API Gateway HTTP + Lambda',
        storage: 'DynamoDB On-Demand',
        cicd: 'GitHub Actions con invalidación en CloudFront',
        functions: 'Lambda Node.js sobre Firecracker',
        networking: 'CloudFront Edge + AWS WAF + Shield',
        estimatedCostTier: '$ (Muy económico con escala a cero)',
        architectureNotes: 'Tríada Serverless probada a escala planetaria.'
      },
      azureStack: {
        compute: 'Azure Static Web Apps (SWA) con Enterprise Edge',
        storage: 'Azure Cosmos DB Serverless',
        cicd: 'GitHub Actions generado automáticamente',
        functions: 'Azure Functions integradas bajo el mismo dominio',
        networking: 'Azure Front Door con TLS gratuito',
        estimatedCostTier: '$ (Capa gratuita generosa en SWA)',
        architectureNotes: 'La experiencia más ágil unificando hosting SPA, SSL y rutas API.'
      },
      decisionRationale:
        'AWS ofrece la base serverless más madura; Azure Static Web Apps acelera la entrega unificando CDN, SSL y funciones.'
    }
  ],
  coursesUi: {
    headerBadge: 'Vitrina de Formaciones & Certificaciones',
    headerTitle: 'Rutas de Aprendizaje & Preparatorios Oficiales',
    headerSubtitle:
      'Guías completas, temarios modulares y cronogramas semana a semana para obtener certificaciones cloud (AWS, Azure, Terraform) y dominar arquitecturas Full-Stack.',
    statPaths: 'Rutas Estructuradas',
    statExams: 'Exámenes',
    statExamsSuffix: 'Mapeados',
    statFocus: 'Enfoque Técnico',
    statFocusValue: '100% Práctico',
    statAligned: 'Planes alineados al mercado',
    statWeeklyPlans: 'Con cronograma semanal y proyectos',
    searchPlaceholder: 'Buscar formación, código de examen (ej: SAA-C03, AZ-204) o tecnología...',
    levelFilterLabel: 'Nivel:',
    levelAll: 'Todos los Niveles',
    levels: [
      { id: 'Iniciante', label: 'Principiante' },
      { id: 'Intermediário', label: 'Intermedio' },
      { id: 'Avançado', label: 'Avanzado' },
      { id: 'Especialista', label: 'Especialista' }
    ],
    levelMap: {
      Iniciante: 'Principiante',
      Intermediário: 'Intermedio',
      Avançado: 'Avanzado',
      Especialista: 'Especialista'
    },
    categories: [
      { id: 'all', label: 'Todas las Rutas' },
      { id: 'certifications', label: 'Certificaciones Oficiales' },
      { id: 'backend', label: 'Backend & APIs' },
      { id: 'frontend', label: 'Frontend Moderno' },
      { id: 'cloud', label: 'Cloud & DevOps' },
      { id: 'architecture', label: 'Datos & Caché' }
    ],
    allFormationsTabPrefix: 'Todas las',
    officialCertsTabPrefix: 'Certificaciones Oficiales',
    showingCount: 'Mostrando',
    formationSingular: 'ruta encontrada',
    formationPlural: 'rutas encontradas',
    clearFilters: 'Limpiar filtros',
    emptyTitle: 'Ninguna ruta encontrada con esos filtros',
    emptyDescBefore: 'No encontramos formaciones para',
    emptyDescAfter: 'Limpia los filtros para ver todas las rutas disponibles.',
    resetBtn: 'Restaurar Todas las Rutas',
    modulesUnit: 'módulos',
    techStackLabel: 'Stack & Herramientas Cubiertas',
    badgeExamPrefix: 'Examen:',
    viewCurriculumBtn: 'Explorar Temario Completo',
    targetAudienceLabel: 'Público Objetivo',
    prerequisitesLabel: 'Prerrequisitos',
    skillsLabel: 'Competencias Adquiridas',
    syllabusTab: 'Temario Modular',
    examTab: 'Pesos del Examen',
    roadmapTab: 'Plan Semanal',
    officialGuideBtn: 'Guía Oficial del Examen',
    officialGuideLinkLabel: 'Abrir Guía Oficial de Certificación',
    relatedArticleBtn: 'Leer Deep Dive Relacionado',
    relatedArticleTitleAttr: 'Leer artículo técnico relacionado',
    relatedCloudBtn: 'Comparar Proveedores Cloud',
    relatedPageTitleAttr: 'Abrir comparativa relacionada',
    closeModalBtn: 'Cerrar Temario',
    modalTitleSuffix: 'Vista Detallada de la Ruta',
    modalFooterAttribution: 'Ruta técnica mantenida por CodeCompare',
    modulesTitle: 'Módulos & Carga Horaria',
    topicsCountLabel: 'temas prácticos',
    examDomainsTitle: 'Dominios Oficiales del Examen',
    examBlueprintPrefix: 'Blueprint Oficial',
    examBlueprintDesc: 'Distribución aproximada de los dominios evaluados en el examen oficial:',
    examWeightLabel: 'Peso:',
    weeklyPlanTitle: 'Cronograma Sugerido de Estudio',
    deliverablesLabel: 'Entregable Práctico:'
  },
  formations: [
    {
      id: 'aws-saa-c03',
      title: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
      subtitle: 'Preparación completa para diseñar arquitecturas resilientes y rentables en AWS.',
      category: 'certifications',
      provider: 'AWS',
      level: 'Intermediário',
      duration: '80 horas sugeridas (8–10 semanas)',
      examCode: 'SAA-C03',
      badgeColor: 'amber',
      technologies: ['AWS IAM', 'EC2', 'S3', 'VPC', 'RDS', 'Aurora', 'DynamoDB', 'ECS/Fargate', 'Lambda', 'SQS/SNS', 'CloudWatch'],
      description: 'Valida tu capacidad para diseñar soluciones seguras, resilientes y optimizadas en costos cubriendo los 4 dominios oficiales del examen SAA-C03.',
      targetAudience: 'Ingenieros de software, arquitectos de soluciones y DevOps en AWS.',
      prerequisites: ['Conocimientos básicos de redes (IP, DNS, CIDR).', 'Nociones de APIs y bases de datos SQL/NoSQL.'],
      skillsLearned: [
        'Diseñar VPCs multi-AZ con subredes públicas/privadas y NAT Gateways.',
        'Dimensionar almacenamiento con S3 Lifecycle/Glacier y EBS gp3/io2.',
        'Construir arquitecturas orientadas a eventos con SQS FIFO, SNS y EventBridge.',
        'Configurar RDS Multi-AZ, Read Replicas y ElastiCache Redis.'
      ],
      modules: [
        { title: 'Módulo 1: Seguridad, IAM & Red (VPC)', hours: '18h', topics: ['IAM & SCPs', 'VPC Subnets & Route Tables', 'Security Groups vs NACLs', 'PrivateLink'] },
        { title: 'Módulo 2: Cómputo Elástico, Contenedores & Serverless', hours: '20h', topics: ['EC2 Spot & ASG', 'ALB vs NLB', 'ECS Fargate vs EKS', 'Lambda & Step Functions'] },
        { title: 'Módulo 3: Almacenamiento, Bases & Caché', hours: '22h', topics: ['EBS, EFS & S3', 'RDS & Aurora', 'DynamoDB & Streams', 'ElastiCache & CloudFront'] },
        { title: 'Módulo 4: Alta Disponibilidad, DR y Costos', hours: '20h', topics: ['Disaster Recovery', 'SQS DLQ & Kinesis', 'CloudWatch & CloudTrail', 'Simulacros de 65 preguntas'] }
      ],
      examDomains: [
        { domain: 'Dominio 1: Arquitecturas Seguras', weight: '30%', description: 'IAM, cifrado KMS y aislamiento de red VPC.' },
        { domain: 'Dominio 2: Arquitecturas Resilientes', weight: '26%', description: 'Tolerancia a fallos multi-AZ y Disaster Recovery.' },
        { domain: 'Dominio 3: Arquitecturas de Alto Desempeño', weight: '24%', description: 'Caché, cómputo elástico y storage.' },
        { domain: 'Dominio 4: Arquitecturas Optimizadas en Costo', weight: '20%', description: 'Selección de instancias y ciclo de vida S3.' }
      ],
      officialGuideUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
      relatedPageId: 'cloud',
      weeklyPlan: [
        { week: 'Semanas 1–2', focus: 'Seguridad, IAM y VPC', deliverables: 'Desplegar VPC multi-AZ funcional con ALB y NAT Gateway.' },
        { week: 'Semanas 3–4', focus: 'Cómputo y Serverless', deliverables: 'Integrar Auto Scaling con Lambda por eventos S3.' },
        { week: 'Semanas 5–6', focus: 'Bases de Datos y S3', deliverables: 'Configurar RDS Replica y políticas hacia Glacier.' },
        { week: 'Semanas 7–8', focus: 'DR y Simulacros', deliverables: 'Superar el 80% en 4 simulacros cronometrados.' }
      ]
    },
    {
      id: 'azure-az-204',
      title: 'Microsoft Certified: Azure Developer Associate (AZ-204)',
      subtitle: 'Desarrollo completo de aplicaciones corporativas cloud-native en Microsoft Azure.',
      category: 'certifications',
      provider: 'Microsoft Azure',
      level: 'Intermediário',
      duration: '70 horas sugeridas (7–9 semanas)',
      examCode: 'AZ-204',
      badgeColor: 'sky',
      technologies: ['Azure App Service', 'Azure Functions', 'Cosmos DB', 'Azure Blob Storage', 'Microsoft Entra ID', 'Key Vault', 'Event Grid', 'Service Bus'],
      description: 'Evalúa capacidades prácticas implementando cómputo PaaS, Cosmos DB, seguridad Entra ID, Key Vault y mensajería con Service Bus.',
      targetAudience: 'Desarrolladores .NET, Java, Python o Node.js que despliegan soluciones en Azure.',
      prerequisites: ['1–2 años programando en C#, Java, Python o JS.', 'Familiaridad básica con Azure CLI y Portal.'],
      skillsLearned: [
        'Desplegar Web Apps en App Service con Deployment Slots.',
        'Desarrollar Azure Functions & Durable Functions.',
        'Usar Entra ID (MSAL), Managed Identities y Key Vault.',
        'Modelar particiones y RU/s en Azure Cosmos DB.'
      ],
      modules: [
        { title: 'Módulo 1: Cómputo en Azure', hours: '18h', topics: ['App Service & Slots', 'Container Apps (ACA)', 'Triggers/Bindings & Durable Functions'] },
        { title: 'Módulo 2: Almacenamiento & Cosmos DB', hours: '16h', topics: ['Blob Tiers & SAS Tokens', 'Partition Keys y RU/s', 'SDK en C# y Python'] },
        { title: 'Módulo 3: Seguridad e Identidad', hours: '16h', topics: ['Entra ID & OAuth2', 'Managed Identities', 'Key Vault & App Config'] },
        { title: 'Módulo 4: Monitoreo, Caché & Eventos', hours: '20h', topics: ['Azure Redis Cache', 'Service Bus & Event Grid', 'Application Insights'] }
      ],
      examDomains: [
        { domain: 'Soluciones de cómputo en Azure', weight: '25-30%', description: 'App Service, Functions y Container Apps.' },
        { domain: 'Almacenamiento en Azure', weight: '15-20%', description: 'Cosmos DB y Blob Storage con SAS.' },
        { domain: 'Seguridad en Azure', weight: '20-25%', description: 'Entra ID, Managed Identities y Key Vault.' },
        { domain: 'Monitoreo y optimización', weight: '15-20%', description: 'Redis Cache y Application Insights.' },
        { domain: 'Integración de servicios', weight: '15-20%', description: 'Service Bus, Event Grid y API Management.' }
      ],
      officialGuideUrl: 'https://learn.microsoft.com/certifications/exams/az-204/',
      relatedPageId: 'cloud',
      relatedArticleId: 'dotnet-minimal-apis',
      weeklyPlan: [
        { week: 'Semanas 1–2', focus: 'App Service & Functions', deliverables: 'Publicar API con slot y función disparada por Blob.' },
        { week: 'Semanas 3–4', focus: 'Cosmos DB y SAS', deliverables: 'CRUD con SDK de Cosmos DB y SAS dinámico.' },
        { week: 'Semanas 5–6', focus: 'Entra ID & Key Vault', deliverables: 'Conectar API a Key Vault usando Managed Identity.' },
        { week: 'Semanas 7–8', focus: 'Service Bus & Simulacros', deliverables: 'Aprobar simulacros oficiales AZ-204.' }
      ]
    },
    {
      id: 'azure-az-305',
      title: 'Microsoft Certified: Azure Solutions Architect Expert (AZ-305)',
      subtitle: 'Certificación Expert en gobernanza corporativa, topologías Hub-Spoke y migraciones.',
      category: 'certifications',
      provider: 'Microsoft Azure',
      level: 'Especialista',
      duration: '90 horas sugeridas (10–12 semanas)',
      examCode: 'AZ-305',
      badgeColor: 'sky',
      technologies: ['Azure Landing Zones', 'Azure Kubernetes (AKS)', 'ExpressRoute', 'Azure SQL Managed Instance', 'Azure Policy', 'Synapse Analytics', 'Azure Front Door'],
      description: 'Certificación insignia de arquitectura en Microsoft Azure enfocada en Landing Zones, redes Hub-Spoke, BCDR y datos empresariales.',
      targetAudience: 'Arquitectos de software y tech leads de plataformas críticas en Azure.',
      prerequisites: ['Conocimientos previos equivalentes a AZ-104 o AZ-204.', 'Experiencia en redes corporativas y datos.'],
      skillsLearned: [
        'Diseñar redes Hub-and-Spoke con Azure Firewall y ExpressRoute.',
        'Estructurar Management Groups y Azure Policy.',
        'Definir bases relacionales Hyperscale/Managed Instance y ADLS Gen2.',
        'Planificar continuidad BCDR con RTO/RPO estrictos.'
      ],
      modules: [
        { title: 'Módulo 1: Gobernanza, Identidad & Red', hours: '22h', topics: ['Management Groups & Policies', 'Hub-Spoke & ExpressRoute', 'Front Door WAF'] },
        { title: 'Módulo 2: Cómputo & Orquestación', hours: '24h', topics: ['AKS CNI vs Kubenet', 'Cómputo Confidencial', 'Bicep & Terraform'] },
        { title: 'Módulo 3: Arquitectura de Datos', hours: '22h', topics: ['SQL Hyperscale vs Managed Instance', 'ADLS Gen2', 'Synapse Analytics'] },
        { title: 'Módulo 4: Continuidad & Migración', hours: '22h', topics: ['Azure Site Recovery & GRS', 'Azure Migrate', 'Casos de estudio'] }
      ],
      examDomains: [
        { domain: 'Identidad, gobernanza y monitoreo', weight: '25-30%', description: 'Entra ID, PIM, Policies y Log Analytics.' },
        { domain: 'Almacenamiento de datos', weight: '25-30%', description: 'SQL Hyperscale, Cosmos DB y Data Lake.' },
        { domain: 'Continuidad de negocio', weight: '10-15%', description: 'Backup, Disaster Recovery y zonas.' },
        { domain: 'Infraestructura y cómputo', weight: '25-30%', description: 'AKS, App Service y Hub-Spoke.' }
      ],
      officialGuideUrl: 'https://learn.microsoft.com/certifications/exams/az-305/',
      relatedPageId: 'cloud'
    },
    {
      id: 'cloud-fundamentals',
      title: 'Fundamentos Dual Cloud: AWS Cloud Practitioner (CLF-C02) & Azure Fundamentals (AZ-900)',
      subtitle: 'Puerta de entrada comparando IaaS, PaaS, SaaS, costos TCO y servicios equivalentes en AWS y Azure.',
      category: 'certifications',
      provider: 'Full-Stack',
      level: 'Iniciante',
      duration: '40 horas sugeridas (4 semanas)',
      examCode: 'CLF-C02 / AZ-900',
      badgeColor: 'emerald',
      technologies: ['Conceptos Cloud', 'IaaS / PaaS / Serverless', 'Modelos TCO', 'Regiones y Zonas', 'Responsabilidad Compartida', 'SLA'],
      description: 'Ruta unificada que enseña fundamentos cloud comparando cada servicio entre AWS y Azure para aprobar ambos exámenes iniciales.',
      targetAudience: 'Desarrolladores júnior, gerentes de TI y analistas de producto.',
      prerequisites: ['Conocimientos informáticos básicos.'],
      skillsLearned: [
        'Diferenciar IaaS, PaaS, SaaS y Serverless.',
        'Dominar el Modelo de Responsabilidad Compartida.',
        'Estimar costos TCO en AWS y Azure.',
        'Mapear los 20 servicios principales entre ambas nubes.'
      ],
      modules: [
        { title: 'Módulo 1: Conceptos Universales', hours: '10h', topics: ['Elasticidad y Escala', 'CapEx vs OpEx', 'Nube Pública/Híbrida'] },
        { title: 'Módulo 2: Infraestructura y Cómputo', hours: '10h', topics: ['Regiones y AZs', 'EC2 vs VMs / Lambda vs Functions', 'Contenedores'] },
        { title: 'Módulo 3: Almacenamiento, Bases & Red', hours: '10h', topics: ['S3 vs Blob', 'RDS/DynamoDB vs Azure SQL/Cosmos', 'VPC vs VNet'] },
        { title: 'Módulo 4: Seguridad & Simulacros', hours: '10h', topics: ['Responsabilidad Compartida', 'Well-Architected & CAF', 'Tests CLF-C02 y AZ-900'] }
      ],
      officialGuideUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
      relatedPageId: 'cloud'
    },
    {
      id: 'dotnet-microservices',
      title: 'Formación Arquitecto .NET 8 & Microservicios Corporativos',
      subtitle: 'Domina C# 12, Minimal APIs de alta concurrencia, EF Core 8, Docker, RabbitMQ y OpenTelemetry.',
      category: 'backend',
      provider: 'Full-Stack',
      level: 'Avançado',
      duration: '85 horas de práctica y proyectos',
      badgeColor: 'violet',
      technologies: ['C# 12', '.NET 8', 'Minimal APIs', 'Entity Framework Core 8', 'Docker', 'PostgreSQL', 'Redis', 'RabbitMQ', 'OpenTelemetry'],
      description: 'Ruta profunda enfocada en Native AOT, Minimal APIs de alto RPS, afinamiento en EF Core, mensajería resiliente con RabbitMQ y trazabilidad OpenTelemetry.',
      targetAudience: 'Ingenieros .NET que evolucionan de monolitos MVC a microservicios modernos.',
      prerequisites: ['C# intermedio y POO.', 'Experiencia previa creando APIs REST.'],
      skillsLearned: [
        'Construir Minimal APIs de más de 45k req/s.',
        'Optimizar EF Core con AsNoTracking y Split Queries.',
        'Implementar Outbox Pattern, MassTransit y Polly.',
        'Instrumentar OpenTelemetry en Prometheus y Grafana.'
      ],
      modules: [
        { title: 'Módulo 1: .NET 8 & Minimal APIs', hours: '20h', topics: ['C# 12', 'TypedResults & Filters', 'Native AOT'] },
        { title: 'Módulo 2: Persistencia EF Core 8', hours: '20h', topics: ['Value Objects & Migraciones', 'EXPLAIN ANALYZE', 'Outbox Pattern'] },
        { title: 'Módulo 3: Mensajería Asíncrona', hours: '25h', topics: ['RabbitMQ + MassTransit', 'Polly & DLQ', 'Idempotencia'] },
        { title: 'Módulo 4: Observabilidad & Docker', hours: '20h', topics: ['Chiseled Dockerfiles', 'OpenTelemetry + Jaeger', 'Health Checks Kubernetes'] }
      ],
      relatedArticleId: 'dotnet-minimal-apis',
      relatedPageId: 'backend',
      relatedTab: 'dotnet'
    },
    {
      id: 'python-fastapi',
      title: 'Formación Ingeniería de APIs con Python & FastAPI Moderno',
      subtitle: 'Construye servicios asíncronos con Python 3.12, Clean Architecture, Pydantic v2 y SQLAlchemy 2.',
      category: 'backend',
      provider: 'Full-Stack',
      level: 'Intermediário',
      duration: '70 horas prácticas',
      badgeColor: 'amber',
      technologies: ['Python 3.12', 'FastAPI', 'AsyncIO', 'Pydantic v2', 'SQLAlchemy 2', 'Alembic', 'Pytest', 'Docker', 'JWT / OAuth2'],
      description: 'Eleva tus APIs Python con validación Pydantic v2 en Rust, asyncpg, Clean Architecture y cobertura superior al 90% con Pytest.',
      targetAudience: 'Desarrolladores Python e ingenieros de datos que despliegan APIs en producción.',
      prerequisites: ['Python intermedio.', 'Nociones de HTTP y SQL relacional.'],
      skillsLearned: [
        'Dominar AsyncIO con Uvicorn y uvloop.',
        'Validar payloads con Pydantic v2.',
        'Gestionar SQLAlchemy 2 asíncrono y Alembic.',
        'Asegurar endpoints con JWT OAuth2 y Pytest.'
      ],
      modules: [
        { title: 'Módulo 1: FastAPI & AsyncIO', hours: '16h', topics: ['Event Loop', 'APIRouter & OpenAPI', 'Exception Handlers'] },
        { title: 'Módulo 2: Pydantic v2', hours: '18h', topics: ['Core en Rust', 'Validadores personalizados', 'pydantic-settings'] },
        { title: 'Módulo 3: Clean Architecture & SQLAlchemy 2', hours: '20h', topics: ['Capas limpias', 'asyncpg asíncrono', 'Alembic'] },
        { title: 'Módulo 4: Seguridad, Tests & Docker', hours: '16h', topics: ['JWT, Bcrypt y RBAC', 'Pytest Fixtures', 'Gunicorn + Uvicorn'] }
      ],
      relatedArticleId: 'fastapi-clean-architecture',
      relatedPageId: 'backend',
      relatedTab: 'python'
    },
    {
      id: 'angular-signals',
      title: 'Formación Frontend Moderno con Angular 17/18 & Signals',
      subtitle: 'Construye SPAs sin sobrecarga de Zone.js mediante reactividad granular y Standalone Components.',
      category: 'frontend',
      provider: 'Full-Stack',
      level: 'Avançado',
      duration: '65 horas de inmersión técnica',
      badgeColor: 'rose',
      technologies: ['Angular 18', 'Signals', 'Computed', 'Effects', 'Standalone Components', 'TypeScript 5', 'RxJS Interop', 'Deferrable Views', 'SSR / Hydration'],
      description: 'Domina el nuevo núcleo reactivo de Angular 17/18, detección Zoneless, @defer y puente fluido entre RxJS y Signals.',
      targetAudience: 'Desarrolladores frontend en sistemas complejos y paneles corporativos.',
      prerequisites: ['JavaScript ES6+ y TypeScript sólido.', 'Experiencia creando componentes web.'],
      skillsLearned: [
        'Dominar signal(), computed() y effect().',
        'Migrar aplicaciones hacia arquitectura Zoneless.',
        'Aplicar flujo de plantilla @if, @for y @defer.',
        'Integrar RxJS y Signals con toSignal() / toObservable().'
      ],
      modules: [
        { title: 'Módulo 1: Revolución de los Signals', hours: '15h', topics: ['Grafos reactivos', 'Computed & Effects', '@if / @for / @defer'] },
        { title: 'Módulo 2: Standalone & Nueva DI', hours: '15h', topics: ['Sin NgModules', 'inject()', 'Signal Stores'] },
        { title: 'Módulo 3: Signals + RxJS', hours: '18h', topics: ['Estado síncrono vs Streams', 'toSignal & toObservable', 'Reintentos HTTP'] },
        { title: 'Módulo 4: SSR, Hidratación & Tests', hours: '17h', topics: ['Vistas diferidas @defer', 'Hidratación no destructiva', 'Vitest / Jasmine'] }
      ],
      relatedArticleId: 'signals-reactivity',
      relatedPageId: 'frontend',
      relatedTab: 'angular'
    },
    {
      id: 'react-nextjs',
      title: 'Formación Arquitecto React 19 & Next.js 14 / App Router',
      subtitle: 'Domina Server Components (RSC), Server Actions, React Compiler, TanStack Query v5 y Core Web Vitals.',
      category: 'frontend',
      provider: 'Full-Stack',
      level: 'Avançado',
      duration: '75 horas de inmersión técnica',
      badgeColor: 'sky',
      technologies: ['React 19', 'Next.js 14', 'Server Components (RSC)', 'Server Actions', 'React Compiler', 'TanStack Query v5', 'Zustand', 'Tailwind CSS'],
      description: 'Combina React 19 y Next.js 14 App Router optimizando las 4 capas de caché, mutaciones Server Actions y métricas Core Web Vitals.',
      targetAudience: 'Desarrolladores React orientados a rendimiento full-stack moderno.',
      prerequisites: ['Hooks de React intermedios.', 'Buen dominio de TypeScript y APIs REST.'],
      skillsLearned: [
        'Separar Server Components y Client Components.',
        'Ejecutar mutaciones seguras con Server Actions y Zod.',
        'Implementar caché reactiva con TanStack Query v5.',
        'Optimizar LCP, INP y CLS en Google Web Vitals.'
      ],
      modules: [
        { title: 'Módulo 1: Modelo Mental React 19', hours: '18h', topics: ['React Compiler', 'use(), useOptimistic(), useActionState()', 'Metadatos nativos'] },
        { title: 'Módulo 2: Next.js 14 App Router', hours: '20h', topics: ['Layouts anidados', 'Server Components', 'Server Actions + Zod'] },
        { title: 'Módulo 3: Caché y Estado Global', hours: '18h', topics: ['TanStack Query v5', 'Zustand', 'Las 4 capas de caché en Next.js'] },
        { title: 'Módulo 4: Web Vitals & Deploy', hours: '19h', topics: ['Streaming SSR con Suspense', 'Auditoría LCP/INP', 'Deploy Vercel y Docker'] }
      ],
      relatedArticleId: 'ssr-edge-rendering',
      relatedPageId: 'frontend',
      relatedTab: 'react'
    },
    {
      id: 'terraform-devops',
      title: 'Formación Infraestructura como Código con Terraform & DevOps',
      subtitle: 'Automatiza provisión multi-cloud con Terraform (Associate 003), Docker, Kubernetes y GitHub Actions.',
      category: 'cloud',
      provider: 'HashiCorp',
      level: 'Intermediário',
      duration: '60 horas prácticas',
      examCode: 'HashiCorp Terraform Associate (003)',
      badgeColor: 'purple',
      technologies: ['Terraform', 'HCL', 'AWS / Azure Providers', 'Docker', 'Kubernetes', 'GitHub Actions', 'Trivy', 'GitOps'],
      description: 'Convierte infraestructura manual en módulos HCL versionados con estado remoto bloqueado, OIDC en GitHub Actions y escaneo de seguridad.',
      targetAudience: 'Ingenieros backend, cloud y DevOps.',
      prerequisites: ['Git y línea de comandos Linux.', 'Conocimiento básico de máquinas virtuales y redes.'],
      skillsLearned: [
        'Escribir código declarativo reutilizable en HCL.',
        'Proteger estados remotos (.tfstate) con bloqueo.',
        'Automatizar terraform plan/apply vía OIDC.',
        'Escanear seguridad IaC con Trivy y Tfsec.'
      ],
      modules: [
        { title: 'Módulo 1: Fundamentos & Sintaxis HCL', hours: '14h', topics: ['init/plan/apply', 'Variables y Outputs', 'for_each & count'] },
        { title: 'Módulo 2: Gestión Segura de Estado', hours: '16h', topics: ['Remote Backends', 'Bloqueo de concurrencia', 'state mv / import'] },
        { title: 'Módulo 3: Módulos Reutilizables', hours: '15h', topics: ['VPC / Clústeres', 'Registry privado', 'Validación custom'] },
        { title: 'Módulo 4: Pipelines GitOps & Examen', hours: '15h', topics: ['PR Plan automático', 'OIDC AWS/Azure', 'Simulacros Terraform 003'] }
      ],
      officialGuideUrl: 'https://www.hashicorp.com/certification/terraform-associate',
      relatedPageId: 'cloud'
    },
    {
      id: 'data-cache-arch',
      title: 'Formación Ingeniería de Datos & Caché: PostgreSQL Avanzado + Redis',
      subtitle: 'Domina modelado relacional, índices GIN/B-Tree, particionamiento JSONB y caching defensivo.',
      category: 'architecture',
      provider: 'Full-Stack',
      level: 'Avançado',
      duration: '60 horas de ingeniería aplicada',
      badgeColor: 'emerald',
      technologies: ['PostgreSQL 16', 'Redis 7', 'EXPLAIN ANALYZE', 'Índices GiN / BRIN', 'Particionado', 'Redlock', 'Cache-Aside', 'PgBouncer'],
      description: 'Aprende a descifrar planes EXPLAIN ANALYZE, particionar tablas de miles de millones de filas y proteger sistemas frente a Cache Stampede.',
      targetAudience: 'Ingenieros backend, DBAs y arquitectos de datos.',
      prerequisites: ['SQL intermedio.', 'Experiencia conectando aplicaciones en producción.'],
      skillsLearned: [
        'Leer EXPLAIN (ANALYZE, BUFFERS) eliminando Seq Scans.',
        'Indexar documentos JSONB con índices GIN.',
        'Diseñar Range Partitioning con retención automática.',
        'Evitar Thundering Herd con jitter TTL y Redlock.'
      ],
      modules: [
        { title: 'Módulo 1: Optimización en PostgreSQL', hours: '16h', topics: ['Shared Buffers, WAL y MVCC', 'Cost, Rows y Buffers', 'Índices B-Tree, Parciales y BRIN'] },
        { title: 'Módulo 2: JSONB & Particionado', hours: '15h', topics: ['Operadores jsonb_path_ops', 'Particionado Range/Hash', 'Autovacuum tuning'] },
        { title: 'Módulo 3: Caché Defensivo con Redis', hours: '15h', topics: ['Cache-Aside vs Write-Through', 'Mitigación Thundering Herd', 'Políticas de evicción LRU'] },
        { title: 'Módulo 4: Alta Disponibilidad & Seguridad', hours: '14h', topics: ['PgBouncer Transaction Pooling', 'Failover con Patroni', 'Respaldos WAL-G y enmascaramiento'] }
      ],
      relatedArticleId: 'redis-caching-patterns',
      relatedPageId: 'database',
      relatedTab: 'relational'
    }
  ]
};

export default cloudCoursesEs;
