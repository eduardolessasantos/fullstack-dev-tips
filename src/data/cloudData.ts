export interface CloudServiceComparison {
  category: 'storage' | 'deploy' | 'cicd' | 'functions';
  title: string;
  subtitle: string;
  aws: {
    serviceName: string;
    icon: string;
    keyFeatures: string[];
    strengths: string[];
    weaknesses: string[];
    pricingModel: string;
    codeSampleTitle?: string;
    codeSampleLang?: string;
    codeSample?: string;
  };
  azure: {
    serviceName: string;
    icon: string;
    keyFeatures: string[];
    strengths: string[];
    weaknesses: string[];
    pricingModel: string;
    codeSampleTitle?: string;
    codeSampleLang?: string;
    codeSample?: string;
  };
  deepDiveAnalysis: string;
  verdict: {
    winner: 'aws' | 'azure' | 'tie';
    summary: string;
    recommendedWhenAWS: string;
    recommendedWhenAzure: string;
  };
  metrics: {
    latency: { aws: string; azure: string };
    scalability: { aws: string; azure: string };
    developerExperience: { aws: string; azure: string };
    integrationEcosystem: { aws: string; azure: string };
  };
}

export interface CloudArchitectureScenario {
  id: string;
  title: string;
  badge: string;
  description: string;
  workloadCharacteristics: {
    concurrency: string;
    database: string;
    framework: string;
    compliance: string;
  };
  awsStack: {
    compute: string;
    storage: string;
    cicd: string;
    functions: string;
    networking: string;
    estimatedCostTier: string;
    architectureNotes: string;
  };
  azureStack: {
    compute: string;
    storage: string;
    cicd: string;
    functions: string;
    networking: string;
    estimatedCostTier: string;
    architectureNotes: string;
  };
  decisionRationale: string;
}

export const CLOUD_CATEGORIES = [
  { id: 'all', label: 'Visão Geral' },
  { id: 'storage', label: '1. Armazenamento (Storage)' },
  { id: 'deploy', label: '2. Deploy & Hospedagem' },
  { id: 'cicd', label: '3. CI / CD & Automação' },
  { id: 'functions', label: '4. Functions (Serverless)' },
  { id: 'scenarios', label: 'Simulador de Arquiteturas' }
] as const;

export const CLOUD_COMPARISONS: CloudServiceComparison[] = [
  // 1. ARMAZENAMENTO - OBJECT STORAGE
  {
    category: 'storage',
    title: 'Object Storage: Amazon S3 vs Azure Blob Storage',
    subtitle: 'Armazenamento de objetos não estruturados, Data Lakes, assets estáticos e backups corporativos.',
    aws: {
      serviceName: 'Amazon S3 (Simple Storage Service)',
      icon: 'AWS-S3',
      keyFeatures: [
        'Consistência forte (read-after-write) para todos os PUTs e DELETEs',
        'Tiers: Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier Flexible, Glacier Deep Archive',
        'URLs pré-assinadas com expiração temporária granular (presigned URLs)',
        'S3 Object Lambda para transformação de dados on-the-fly sem duplicar arquivos',
        'Replicação entre regiões (CRR) e dentro da mesma região (SRR)'
      ],
      strengths: [
        'Padrão da indústria absoluta com ecossistema universal (SDKs em qualquer linguagem)',
        'Intelligent-Tiering move objetos automaticamente entre camadas sem cobrança de recuperação imprevista',
        'Throughput massivo comprovado para clusters de Big Data e Data Lakes'
      ],
      weaknesses: [
        'Custo elevado de tráfego de saída (Data Egress) para fora da AWS',
        'Políticas de bucket IAM e ACLs históricas podem gerar erros de configuração se não auditadas'
      ],
      pricingModel: '$0.023/GB (Standard primeiros 50 TB) + $0.005 por 1.000 requisições PUT/COPY + egress',
      codeSampleTitle: 'Upload com URL Pré-Assinada em Node.js (AWS SDK v3)',
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

  // URL válida por 15 minutos
  return await getSignedUrl(s3, command, { expiresIn: 900 });
}`
    },
    azure: {
      serviceName: 'Azure Blob Storage (Azure Storage)',
      icon: 'Azure-Blob',
      keyFeatures: [
        'Hierarquia com Contas de Armazenamento (Storage Accounts) e Containers',
        'Tiers: Hot, Cool, Cold, Archive (alteração de tier por objeto ou por regra de ciclo de vida)',
        'Shared Access Signatures (SAS Tokens) com delegação via Entra ID (Azure AD)',
        'Azure Data Lake Storage Gen2 (ADLSv2) com namespace hierárquico nativo para Big Data',
        'Geo-redundância flexível (LRS, ZRS, GRS, GZRS) com leitura secundária (RA-GRS)'
      ],
      strengths: [
        'Namespace hierárquico (diretórios reais no ADLSv2) acelera operações atômicas em Data Lakes',
        'Excelente integração com Microsoft Fabric, Synapse Analytics e ecossistema .NET',
        'SAS Tokens associados a Managed Identities reduzem vazamentos de chaves mestras'
      ],
      weaknesses: [
        'Reidratação de objetos arquivados pode levar até 15 horas sem opção de alta prioridade cara',
        'Transição entre tiers requer planejamento rigoroso de custos de leitura/escrita'
      ],
      pricingModel: '$0.018/GB (Hot primeiros 50 TB) + $0.005 por 10.000 operações de gravação + egress',
      codeSampleTitle: 'Upload com SAS Token Delegado em C# (.NET 8)',
      codeSampleLang: 'csharp',
      codeSample: `using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using Azure.Identity;

var blobServiceClient = new BlobServiceClient(
    new Uri("https://meustorage.blob.core.windows.net"),
    new DefaultAzureCredential());

var containerClient = blobServiceClient.GetBlobContainerClient("documentos");
var blobClient = containerClient.GetBlobClient($"fatura-{Guid.NewGuid()}.pdf");

// Gerando SAS URL via Entra ID sem expor chave de acesso da conta
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
    deepDiveAnalysis: 'Ambos os serviços entregam durabilidade de 99.999999999% (11 noves) e consistência forte. O S3 destaca-se pelo Intelligent-Tiering e padronização global com suporte em qualquer biblioteca open-source. O Azure Blob brilha em cenários analíticos corporativos com o ADLS Gen2, oferecendo diretórios de verdade e melhor custo base de armazenamento em repouso por GB na camada Hot.',
    verdict: {
      winner: 'tie',
      summary: 'Empate técnico. A escolha ideal depende do ecossistema: S3 para máxima compatibilidade universal e tooling open-source; Azure Blob para ecossistemas analíticos integrados à Microsoft e custos menores em repouso.',
      recommendedWhenAWS: 'Quando necessita de compatibilidade universal com ferramentas de terceiros, Terraform maduro ou arquiteturas baseadas em AWS Lambda e Athena.',
      recommendedWhenAzure: 'Quando necessita de Data Lake com namespace hierárquico (ADLSv2), integração com Power BI/Synapse ou autenticação unificada via Microsoft Entra ID.'
    },
    metrics: {
      latency: { aws: '~10-15ms primeiro byte (Standard)', azure: '~12-18ms primeiro byte (Hot)' },
      scalability: { aws: '3.500 PUTs/s e 5.500 GETs/s por prefixo', azure: 'Até 20.000 ops/s por conta de storage' },
      developerExperience: { aws: 'Excelente (SDK v3 modular e CLI rápida)', azure: 'Muito boa (Azure SDK unificado com DefaultAzureCredential)' },
      integrationEcosystem: { aws: 'Líder de mercado (universal)', azure: 'Forte em Microsoft 365, PowerPlatform e Databricks' }
    }
  },

  // 2. ARMAZENAMENTO - BLOCK STORAGE (DISCOS)
  {
    category: 'storage',
    title: 'Block Storage: AWS EBS vs Azure Managed Disks',
    subtitle: 'Volumes de bloco de baixa latência para bancos de dados (PostgreSQL, MongoDB, SQL Server) e I/O intensivo.',
    aws: {
      serviceName: 'Amazon Elastic Block Store (EBS)',
      icon: 'AWS-EBS',
      keyFeatures: [
        'Tipos: gp3 (General Purpose configurável), io2 Block Express (alta performance), st1 e sc1 (HDD)',
        'EBS gp3: permite desacoplar IOPS (3.000 base até 16.000) e Throughput (125 MB/s até 1.000 MB/s) do tamanho do disco',
        'io2 Block Express: até 256.000 IOPS, 4.000 MB/s de throughput e latência sub-milissegundo',
        'Multi-Attach em io2 para instâncias em cluster (Nitro)',
        'Snapshots rápidos salvos diretamente no S3 incrementalmente'
      ],
      strengths: [
        'EBS gp3 é o disco com melhor custo-benefício da nuvem: você não precisa pagar por gigabytes desnecessários para ganhar IOPS',
        'io2 Block Express tem latência de microssegundos consistente para bancos ACID'
      ],
      weaknesses: [
        'Volumes são restritos a uma única Zona de Disponibilidade (AZ)',
        'Modificações de volume em tempo real exigem aguardar período de resfriamento (cooldown)'
      ],
      pricingModel: 'gp3: $0.08/GB-mês (inclui 3.000 IOPS e 125 MB/s gratuitos) + $0.005/IOPS adicional',
      codeSampleTitle: 'Configuração Terraform de Volume gp3 com IOPS provisionado',
      codeSampleLang: 'hcl',
      codeSample: `resource "aws_ebs_volume" "postgres_data" {
  availability_zone = "us-east-1a"
  size              = 100 # GB
  type              = "gp3"
  iops              = 6000 # desacoplado do tamanho
  throughput        = 250  # MB/s
  encrypted         = true

  tags = {
    Ambiente = "Producao"
    Workload = "PostgreSQL-OLTP"
  }
}`
    },
    azure: {
      serviceName: 'Azure Managed Disks',
      icon: 'Azure-Disks',
      keyFeatures: [
        'Tipos: Standard HDD, Standard SSD, Premium SSD (v1), Premium SSD v2, Ultra Disk',
        'Premium SSD v2: permite provisionar IOPS e Throughput de forma flexível semelhante ao gp3',
        'Ultra Disk: até 160.000 IOPS e 4.000 MB/s com latência menor que 1ms',
        'Shared Disks com SCSI PR para clusters de failover Windows Server (WSFC) e Pacemaker Linux',
        'Zone Redundant Storage (ZRS) para discos gerenciados em múltiplas zonas de disponibilidade'
      ],
      strengths: [
        'Discos com redundância zonal (ZRS) permitem que VMs em diferentes AZs montem os mesmos volumes em cenários de alta disponibilidade',
        'Suporte perfeito a clusters de SQL Server Always On com Shared Disks'
      ],
      weaknesses: [
        'Premium SSD v1 possui IOPS atrelado rigidamente ao tamanho do disco (ex: P10 = 128GB = 500 IOPS)',
        'Ultra Disks não suportam snapshots diretos nem backup nativo com facilidade'
      ],
      pricingModel: 'Premium SSD v2: ~$0.073/GB-mês + 3.000 IOPS base + $0.005/IOPS adicional',
      codeSampleTitle: 'Bicep para Provisionamento de Premium SSD v2',
      codeSampleLang: 'bicep',
      codeSample: `resource postgresDataDisk 'Microsoft.Compute/disks@2023-10-02' = {
  name: 'disk-postgres-prod-01'
  location: resourceGroup().location
  sku: {
    name: 'PremiumV2_LRS'
  }
  properties: {
    diskSizeGB: 100
    diskIOPSReadWrite: 6000
    diskMBpsReadWrite: 250
    creationData: {
      createOption: 'Empty'
    }
  }
}`
    },
    deepDiveAnalysis: 'A AWS revolucionou o mercado com o EBS gp3 ao permitir desacoplar capacidade de disco de throughput e IOPS. A Azure respondeu com o Premium SSD v2, que oferece a mesma flexibilidade. O grande diferencial da Azure é o suporte a discos zonais (ZRS Managed Disks) e Shared Disks com reservas SCSI nativas para clusters de banco legados.',
    verdict: {
      winner: 'aws',
      summary: 'AWS vence por ligeira vantagem pela maturidade e estabilidade do EBS gp3, que está disponível em todas as regiões sem limitações de snapshots ou backups.',
      recommendedWhenAWS: 'Para servidores Linux e instâncias de banco (PostgreSQL, MySQL, Redis) que exigem excelente custo-benefício com gp3.',
      recommendedWhenAzure: 'Para clusters de SQL Server corporativos com Failover Clustering (WSFC) ou quando discos ZRS multi-zona forem mandatórios.'
    },
    metrics: {
      latency: { aws: '0.8ms a 1.5ms (gp3) / <0.5ms (io2)', azure: '1.0ms a 2.0ms (Premium v2) / <1.0ms (Ultra)' },
      scalability: { aws: 'Até 64 TB por volume (gp3/io2)', azure: 'Até 64 TB por volume (Premium v2/Ultra)' },
      developerExperience: { aws: 'Excelente (APIs e Terraform consolidados)', azure: 'Muito boa (portal claro e comandos az disk rápidos)' },
      integrationEcosystem: { aws: 'EC2 Nitro, EKS CSI Driver', azure: 'Azure VMs, AKS CSI Driver, Azure Backup' }
    }
  },

  // 3. DEPLOY & HOSPEDAGEM (CONTAINERS E PAAS)
  {
    category: 'deploy',
    title: 'Hospedagem & Containers: AWS (App Runner / ECS) vs Azure (Container Apps / App Service)',
    subtitle: 'Deploy de APIs REST, microsserviços em containers Docker e aplicações web escaláveis.',
    aws: {
      serviceName: 'AWS App Runner & Amazon ECS (Elastic Container Service)',
      icon: 'AWS-ECS',
      keyFeatures: [
        'App Runner: PaaS totalmente gerenciado que constrói e roda containers direto do Git ou ECR',
        'ECS Fargate: orquestração de containers sem servidores sem a sobrecarga de gerenciar nós Kubernetes',
        'Task Definitions declarativas integradas diretamente a IAM Roles para granularidade de segurança',
        'Service Connect para service mesh leve e descoberta de serviços sem DNS complexo',
        'Integração nativa com Application Load Balancer (ALB) e AWS WAF'
      ],
      strengths: [
        'ECS com Fargate é comprovadamente mais simples e estável operacionalmente que Kubernetes para 80% das empresas',
        'Excelente previsibilidade de custos com Savings Plans e Fargate Spot com até 70% de desconto',
        'Segurança impecável com Task IAM Roles isoladas por container'
      ],
      weaknesses: [
        'App Runner ainda carece de escalonamento para zero real e tem suporte limitado a VPCs privadas complexas',
        'ECS utiliza terminologia proprietária (Tasks, Services, Task Definitions) que não se traduz para outras clouds'
      ],
      pricingModel: 'Fargate: ~$0.04048/vCPU-hora + $0.004445/GB-hora (cobrança por segundo)',
      codeSampleTitle: 'Task Definition ECS em JSON (Node.js API)',
      codeSampleLang: 'json',
      codeSample: `{
  "family": "api-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [
    {
      "name": "api-container",
      "image": "123456789.dkr.ecr.us-east-1.amazonaws.com/api:latest",
      "essential": true,
      "portMappings": [{ "containerPort": 8080, "protocol": "tcp" }],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/api-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}`
    },
    azure: {
      serviceName: 'Azure Container Apps (ACA) & Azure App Service',
      icon: 'Azure-ACA',
      keyFeatures: [
        'Container Apps: construído sobre Kubernetes gerenciado e KEDA, com escalonamento para ZERO real',
        'App Service: PaaS maduro com Deployment Slots (Staging ➔ Production com swap instantâneo e zero downtime)',
        'Suporte nativo a Dapr (Distributed Application Runtime) para mensageria e estado em microsserviços',
        'Envoy Proxy embutido com divisão de tráfego percentual para Canary e testes A/B',
        'Certificados SSL automáticos e gratuitos gerenciados pela Microsoft'
      ],
      strengths: [
        'Azure Container Apps permite escala para 0 réplicas (zero custo quando ocioso) com inicialização rápida',
        'Deployment Slots do App Service é a melhor funcionalidade de release seguro do mercado',
        'KEDA nativo permite escalar baseado em tamanho de fila (Azure Service Bus, RabbitMQ, Kafka) sem código extra'
      ],
      weaknesses: [
        'Cold start perceptível no Container Apps quando escalado de 0 para 1 réplica',
        'App Service em planos dedicados (Premium v3) tem custo mínimo de entrada mais alto para projetos pequenos'
      ],
      pricingModel: 'Container Apps: primeiros 180k vCPU-s e 360k GB-s gratuitos por mês; após ~$0.000024/vCPU-s',
      codeSampleTitle: 'Template Bicep para Azure Container Apps com KEDA e Escala para Zero',
      codeSampleLang: 'bicep',
      codeSample: `resource containerApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: 'api-backend-app'
  location: resourceGroup().location
  properties: {
    managedEnvironmentId: acaEnv.id
    configuration: {
      ingress: {
        external: true
        targetPort: 8080
      }
    }
    template: {
      containers: [
        {
          name: 'api'
          image: 'meuacr.azurecr.io/api:latest'
          resources: { cpu: json('0.5'), memory: '1.0Gi' }
        }
      ]
      scale: {
        minReplicas: 0 // Economia total sem tráfego!
        maxReplicas: 10
      }
    }
  }
}`
    },
    deepDiveAnalysis: 'Se você busca simplicidade para rodar containers com estabilidade de produção, o ECS Fargate da AWS é incomparável em robustez. No entanto, a Azure com o Azure Container Apps (ACA) trouxe inovação ao embutir KEDA e Envoy com escala para zero nativa, e o Azure App Service ainda oferece o melhor mecanismo de Blue/Green deployment do mercado com seus Deployment Slots.',
    verdict: {
      winner: 'azure',
      summary: 'Azure vence para novas aplicações conteinerizadas devido à flexibilidade moderna do Azure Container Apps (KEDA + escala para zero) e a maturidade dos Deployment Slots do App Service.',
      recommendedWhenAWS: 'Quando você precisa de orquestração de containers de altíssima escala com ECS Fargate sem a sobrecarga de gerenciar ingress ou Kubernetes.',
      recommendedWhenAzure: 'Quando necessita de escala para zero (economia em microsserviços ociosos), esteiras Blue/Green nativas com Deployment Slots ou ecossistema .NET corporativo.'
    },
    metrics: {
      latency: { aws: 'ALB routing ~1-3ms adicional', azure: 'Envoy Ingress ~2-4ms adicional' },
      scalability: { aws: 'Subida linear de centenas de tasks em ~30-60s', azure: 'KEDA escalona por eventos de fila em segundos' },
      developerExperience: { aws: 'Média (ECS exige múltiplas peças: ALB, Target Group, Task, Service)', azure: 'Excelente (Container Apps encapsula ingress e TLS em 1 recurso)' },
      integrationEcosystem: { aws: 'AWS IAM, CloudWatch, ECR, Route53', azure: 'Azure Entra ID, Log Analytics, ACR, App Insights' }
    }
  },

  // 4. CI / CD & AUTOMAÇÃO
  {
    category: 'cicd',
    title: 'CI / CD: AWS CodePipeline / CodeBuild vs Azure DevOps / GitHub Actions',
    subtitle: 'Automação de testes, esteiras de build de imagens Docker e pipelines de entrega contínua.',
    aws: {
      serviceName: 'AWS CodePipeline, CodeBuild & CodeDeploy',
      icon: 'AWS-CodePipeline',
      keyFeatures: [
        'CodeBuild: ambiente de build efêmero sob demanda com suporte a Docker in Docker (DinD)',
        'CodeDeploy: suporta implantações Blue/Green e Canary com rollback automático via alarmes CloudWatch',
        'CodePipeline: orquestrador visual de estágios (Source ➔ Build ➔ Test ➔ Deploy)',
        'Autenticação sem segredos via IAM Role para pipelines executando dentro da AWS',
        'Suporte a GitHub, Bitbucket e AWS CodeCommit como gatilhos'
      ],
      strengths: [
        'Execução 100% dentro da VPC com acesso seguro a recursos internos sem expor IPs públicos',
        'Rollback automático no CodeDeploy caso alarmes de métricas (5xx ou latência) sejam acionados'
      ],
      weaknesses: [
        'Interface visual legada e verbosidade extrema na configuração de pipelines em comparação com GitHub Actions',
        'AWS anunciou a descontinuação gradual do CodeCommit para novos clientes, direcionando ao GitHub/GitLab'
      ],
      pricingModel: '$1.00 por pipeline ativo/mês no CodePipeline + $0.005/minuto no CodeBuild (general1.small)',
      codeSampleTitle: 'Pipeline GitHub Actions usando AWS OIDC (Sem chaves fixas)',
      codeSampleLang: 'yaml',
      codeSample: `name: Deploy to Amazon ECS
on:
  push:
    branches: [ main ]

permissions:
  id-token: write # Mandatório para AWS OIDC federado
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789:role/GitHubActionsECSRole
          aws-region: us-east-1

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build and Push Docker image
        run: |
          docker build -t \${{ steps.login-ecr.outputs.registry }}/api:\${{ github.sha }} .
          docker push \${{ steps.login-ecr.outputs.registry }}/api:\${{ github.sha }}

      - name: Deploy Amazon ECS Task
        uses: aws-actions/amazon-ecs-deploy-task-definition@v2
        with:
          task-definition: task-definition.json
          service: api-service
          cluster: prod-cluster`
    },
    azure: {
      serviceName: 'Azure DevOps Pipelines & GitHub Actions',
      icon: 'Azure-DevOps',
      keyFeatures: [
        'Azure Pipelines: suporte híbrido multiplataforma (Linux, Windows, macOS) com YAML e releases gerenciados',
        'GitHub Actions: ecossistema líder mundial de automação com milhares de ações da comunidade',
        'Workload Identity Federation (OIDC) com Azure Entra ID para dispensar Service Principals com senhas',
        'Aprovações manuais (Gates & Environments) com janelas de release e checagem de conformidade',
        'Suporte a Self-Hosted Runners e Container Runners sob demanda'
      ],
      strengths: [
        'GitHub Actions e Azure Pipelines são os padrões dominantes do mercado com DX infinitamente superior',
        'Rastreabilidade total: commit ➔ pull request ➔ work item/issue ➔ artifact ➔ deploy em produção',
        'Suporte de primeira classe para ambientes multi-cloud (deploy em Azure, AWS e on-premise com facilidade)'
      ],
      weaknesses: [
        'Runners gerenciados de Windows/macOS consomem minutos de franquia mais rápido (taxa multiplicadora)',
        'Complexidade de governança em grandes corporações ao sincronizar permissões entre GitHub e Entra ID'
      ],
      pricingModel: 'GitHub: 2.000 mins/mês gratuitos; Azure DevOps: 1 runner paralelo grátis com 1.800 mins/mês',
      codeSampleTitle: 'Pipeline GitHub Actions usando Azure OIDC (Federated Credential)',
      codeSampleLang: 'yaml',
      codeSample: `name: Deploy to Azure Container Apps
on:
  push:
    branches: [ main ]

permissions:
  id-token: write # Autenticação passwordless via Entra ID
  contents: read

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Azure Login com OIDC
        uses: azure/login@v2
        with:
          client-id: \${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: \${{ secrets.AZURE_TENANT_ID }}
          subscription-id: \${{ secrets.AZURE_SUBSCRIPTION_ID }}

      - name: Build & Deploy para Azure Container Apps
        uses: azure/container-apps-deploy-action@v1
        with:
          containerAppName: api-backend-app
          resourceGroup: rg-producao
          imageToBuild: meuacr.azurecr.io/api:\${{ github.sha }}
          dockerfilePath: Dockerfile`
    },
    deepDiveAnalysis: 'A AWS focou suas ferramentas nativas (CodePipeline/CodeBuild) para uso estrito dentro de sua infraestrutura e, na prática, a grande maioria dos engenheiros adota GitHub Actions ou GitLab CI para deploy na AWS. Por outro lado, a Microsoft é dona do GitHub e do Azure DevOps, fornecendo as esteiras de CI/CD mais populares, intuitivas e bem documentadas do mundo moderno.',
    verdict: {
      winner: 'azure',
      summary: 'Vitória incontestável da Microsoft com o dueto GitHub Actions e Azure DevOps, que dominam o mercado em experiência do desenvolvedor, modularidade e ecossistema de extensões.',
      recommendedWhenAWS: 'Utilize GitHub Actions com AWS OIDC (configure-aws-credentials) em vez das ferramentas nativas da AWS.',
      recommendedWhenAzure: 'Adote GitHub Actions ou Azure DevOps nativamente para qualquer workload corporativo com rastreabilidade completa.'
    },
    metrics: {
      latency: { aws: 'Início de build no CodeBuild: ~20-40s', azure: 'Início de job no GitHub Actions: ~5-15s' },
      scalability: { aws: 'Builds concorrentes configuráveis por cota', azure: 'Escala massiva com runners efêmeros' },
      developerExperience: { aws: 'Baixa a Média (verboso e fragmentado)', azure: 'Excelente (comunidade ativa, marketplace gigante)' },
      integrationEcosystem: { aws: 'Focado em serviços AWS', azure: 'Universal, multi-cloud e on-premises' }
    }
  },

  // 5. FUNCTIONS (SERVERLESS COMPUTE)
  {
    category: 'functions',
    title: 'Serverless Functions: AWS Lambda vs Azure Functions',
    subtitle: 'Processamento orientado a eventos, APIs serverless, pipelines de dados assíncronos e automação.',
    aws: {
      serviceName: 'AWS Lambda',
      icon: 'AWS-Lambda',
      keyFeatures: [
        'Runtimes: Node.js 20, Python 3.12, Java 21, .NET 8, Ruby, Go e Custom Runtimes (Amazon Linux 2023)',
        'Lambda SnapStart para Java (e em breve outras linguagens): restaura snapshot de memória reduzindo cold start para sub-segundos',
        'Imagens de container de até 10GB em vez de apenas pacotes ZIP de 250MB descompactados',
        'Provisioned Concurrency para eliminar 100% dos cold starts em endpoints de missão crítica',
        'Integração direta com mais de 200 serviços AWS (EventBridge, S3, SQS, DynamoDB, API Gateway)'
      ],
      strengths: [
        'Pioneiro e líder de estabilidade: execução isolada por microVM (Firecracker) com isolamento estrito',
        'Cold starts ultrarrápidos em Node.js e Python (< 150ms)',
        'Escala agressiva: capacidade de iniciar milhares de instâncias por minuto instantaneamente'
      ],
      weaknesses: [
        'Timeout rígido de 15 minutos (tarefas de longa duração exigem AWS Step Functions ou Fargate)',
        'Cobrança por requisições e memória-segundo pode sair cara para tráfego contínuo e constante 24/7'
      ],
      pricingModel: '1 milhão de requisições e 400.000 GB-segundos gratuitos por mês vitalícios; após $0.20/1M req',
      codeSampleTitle: 'Handler AWS Lambda em Python com Powertools para Observabilidade',
      codeSampleLang: 'python',
      codeSample: `import json
from aws_lambda_powertools import Logger, Tracer
from aws_lambda_powertools.event_handler import APIGatewayRestResolver

logger = Logger()
tracer = Tracer()
app = APIGatewayRestResolver()

@app.get("/pedidos/<pedido_id>")
@tracer.capture_method
def get_pedido(pedido_id: str):
    logger.info(f"Buscando pedido {pedido_id}")
    # Simula busca no DynamoDB
    return {"id": pedido_id, "status": "Processado", "total": 149.90}

@logger.inject_lambda_context
@tracer.capture_lambda_handler
def lambda_handler(event, context):
    return app.resolve(event, context)`
    },
    azure: {
      serviceName: 'Azure Functions',
      icon: 'Azure-Functions',
      keyFeatures: [
        'Runtimes: .NET 8 (Isolated Worker model com suporte a AOT), Python 3.11/3.12, Node.js, Java, PowerShell',
        'Flex Consumption Plan (nova geração): escala rápida, integração com VNet sem custo de plano Premium e escala para zero',
        'Triggers e Bindings Declarativos: lê e escreve em Cosmos DB, Blob, Service Bus sem instanciar clientes SDK manuais',
        'Durable Functions: orquestração de fluxos complexos com estado (stateful) usando código assíncrono nativo',
        'Plano Premium: execuções sem limite de tempo e instâncias pré-aquecidas para eliminar cold starts'
      ],
      strengths: [
        'Durable Functions é de longe o melhor framework para orquestrar workflows serverless (Fan-out/Fan-in, Chaining, Human approval)',
        'Bindings declarativos reduzem em 50% as linhas de código necessárias para ler de uma fila e salvar no banco',
        'Performance estelar com .NET 8 Native AOT com inicialização abaixo de 50ms'
      ],
      weaknesses: [
        'Cold starts no plano Consumption tradicional com Java ou Python podem ser mais perceptíveis que no Lambda',
        'Depuração local de bindings pode ser confusa para desenvolvedores que não utilizam o Azure Core Tools ou VS Code'
      ],
      pricingModel: '1 milhão de requisições e 400.000 GB-segundos gratuitos por mês; Flex Consumption baseado em recursos',
      codeSampleTitle: 'Azure Function .NET 8 com Triggers e Output Bindings Declarativos',
      codeSampleLang: 'csharp',
      codeSample: `using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

public class PedidosFunction
{
    private readonly ILogger _logger;

    public PedidosFunction(ILoggerFactory loggerFactory)
    {
        _logger = loggerFactory.CreateLogger<PedidosFunction>();
    }

    [Function("ProcessarPedido")]
    public PedidoOutput Run(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = "pedidos")] HttpRequestData req)
    {
        _logger.LogInformation("Recebido novo pedido para processamento.");

        var novoPedido = new Pedido { Id = Guid.NewGuid().ToString(), Status = "Aprovado" };

        var response = req.CreateResponse(HttpStatusCode.Created);
        response.WriteAsJsonAsync(novoPedido);

        return new PedidoOutput
        {
            HttpResponse = response,
            // Salva diretamente na fila do Azure Service Bus via Output Binding!
            FilaMessage = novoPedido
        };
    }
}`
    },
    deepDiveAnalysis: 'O AWS Lambda continua sendo o padrão ouro em throughput, rapidez de inicialização sob demanda e ecossistema de eventos com o EventBridge. Contudo, o Azure Functions possui dois trunfos massivos: as Durable Functions (que resolvem problemas complexos de orquestração de workflows sem precisar de DSLs como o Step Functions da AWS) e os Bindings declarativos que poupam dezenas de linhas de código de infraestrutura.',
    verdict: {
      winner: 'tie',
      summary: 'Empate técnico de alto nível. AWS Lambda vence para microserviços orientados a eventos com milhões de execuções esparsas e ecossistema Node/Python; Azure Functions vence com Durable Functions, ecossistema .NET corporativo e redução de código via bindings.',
      recommendedWhenAWS: 'Para arquiteturas de microsserviços orientadas a eventos puros (EDA), processamento massivo de streams com Kinesis e integrações com o DynamoDB.',
      recommendedWhenAzure: 'Quando necessita de workflows de longa duração com Durable Functions (ex: aprovação humana, fan-out/fan-in) ou aplicações em C# / .NET 8.'
    },
    metrics: {
      latency: { aws: 'Cold start: ~120ms (Node), ~180ms (Python), ~600ms (.NET JIT)', azure: 'Cold start: ~150ms (Node), ~35ms (.NET AOT), ~800ms (Java)' },
      scalability: { aws: 'Burst de até 3.000 instâncias no primeiro minuto', azure: 'Escala granular com KEDA e Flex Consumption' },
      developerExperience: { aws: 'Excelente via SAM, CDK ou Serverless Framework', azure: 'Excelente no VS Code e Visual Studio com Core Tools' },
      integrationEcosystem: { aws: 'EventBridge, SQS, SNS, DynamoDB, API Gateway', azure: 'Event Grid, Service Bus, Cosmos DB, Azure Storage' }
    }
  }
];

export const CLOUD_SCENARIOS: CloudArchitectureScenario[] = [
  {
    id: 'enterprise-dotnet',
    title: 'Plataforma Corporativa .NET 8 & SQL Transacional',
    badge: 'Enterprise • Alta Confiabilidade',
    description: 'Sistema ERP / Financeiro corporativo com regras de negócio densas, autenticação corporativa única (SSO) e necessidade de deploys contínuos sem downtime.',
    workloadCharacteristics: {
      concurrency: '5.000 usuários concorrentes corporativos',
      database: 'Relacional ACID com histórico auditável',
      framework: 'ASP.NET Core 8 Web API & Blazor/React',
      compliance: 'LGPD, SOC 2, Auditoria de logs por 5 anos'
    },
    awsStack: {
      compute: 'AWS ECS Fargate com Application Load Balancer (ALB) multi-AZ',
      storage: 'EBS gp3 para banco + Amazon S3 com Object Lock para logs de auditoria',
      cicd: 'GitHub Actions com AWS OIDC federado apontando para Amazon ECR',
      functions: 'AWS Lambda (.NET 8) disparado por filas SQS para processamento assíncrono de relatórios',
      networking: 'VPC privada com NAT Gateways em 3 Zonas de Disponibilidade e AWS WAF',
      estimatedCostTier: '$$$ (Médio-Alto com custos de NAT Gateway e ALB)',
      architectureNotes: 'Excelente resiliência. Exige configuração manual de roles IAM e Task Definitions no ECS.'
    },
    azureStack: {
      compute: 'Azure App Service (Plano Premium v3) com Deployment Slots OU Azure Container Apps',
      storage: 'Azure SQL Database Managed Instance + Azure Blob Storage com Immutability Policies',
      cicd: 'Azure DevOps Pipelines / GitHub Actions integrado nativamente com Entra ID',
      functions: 'Azure Functions (.NET 8 Isolated) com Durable Functions para workflows de conciliação',
      networking: 'Azure Virtual Network com Private Endpoints e Azure Front Door com WAF',
      estimatedCostTier: '$$$ (Competitivo pelo benefício do Azure Hybrid Benefit em licenças Windows/SQL)',
      architectureNotes: 'A escolha nativa para times .NET. Deployment Slots eliminam o risco de downtime em releases e o Azure Hybrid Benefit reduz até 40% dos custos se a empresa já possuir licenças Microsoft.'
    },
    decisionRationale: 'A Azure oferece vantagem competitiva expressiva para pilhas .NET devido ao Azure Hybrid Benefit, facilidade de autenticação unificada via Microsoft Entra ID (antigo Azure AD) e os Deployment Slots do App Service.'
  },
  {
    id: 'python-ai-async',
    title: 'API de Processamento de Dados & IA em Python',
    badge: 'Data Science • Machine Learning',
    description: 'Serviço para ingestão de grandes volumes de documentos, extração de texto, vetorização para busca semântica (RAG) e inferência com modelos de linguagem.',
    workloadCharacteristics: {
      concurrency: 'Picos esporádicos com processamento intensivo de CPU/GPU',
      database: 'NoSQL com suporte a busca vetorial (pgvector ou vetorial nativo)',
      framework: 'FastAPI (Python 3.12) + Celery / Filas',
      compliance: 'Isolamento de dados de treino e criptografia em trânsito'
    },
    awsStack: {
      compute: 'AWS ECS Fargate com instâncias GPU G5 para inferência + App Runner para FastAPI',
      storage: 'Amazon S3 com S3 Express One Zone para latência de microssegundos em datasets',
      cicd: 'GitHub Actions compilando imagens Docker otimizadas para ECR',
      functions: 'AWS Lambda com suporte a containers de 10GB e AWS Step Functions para pipelines de dados',
      networking: 'VPC com VPC Endpoints para S3 e DynamoDB sem passar pela internet pública',
      estimatedCostTier: '$$$$ (Alto devido a instâncias com GPU e volume de I/O de dados)',
      architectureNotes: 'Liderança absoluta em ecossistema de dados e IA com Amazon Bedrock, SageMaker e compatibilidade com bibliotecas Python open-source.'
    },
    azureStack: {
      compute: 'Azure Container Apps com perfis de computação de GPU dedicados',
      storage: 'Azure Blob Storage com ADLS Gen2 para organização hierárquica de datasets',
      cicd: 'GitHub Actions com integração direta ao Azure Container Registry (ACR)',
      functions: 'Azure Functions em Python com KEDA escalando pods pelo tamanho da fila de processamento',
      networking: 'VNet privada com Private Endpoints integrados ao Azure OpenAI Service',
      estimatedCostTier: '$$$$ (Alto com GPUs; excelente se consome Azure OpenAI com endpoints dedicados)',
      architectureNotes: 'Integração líder com Azure OpenAI Service (GPT-4o corporativo privado sob o mesmo tenant de segurança).'
    },
    decisionRationale: 'Se a prioridade for consumir modelos de ponta com segurança empresarial e privacidade garantida, a Azure com o Azure OpenAI leva vantagem. Para treinar modelos próprios ou pipelines massivos de Data Engineering open-source, a AWS oferece mais opções de instâncias e ferramentas de ponta.'
  },
  {
    id: 'serverless-web-spa',
    title: 'Portal Web Moderno & APIs Serverless de Alta Escala',
    badge: 'Web Moderna • Escala Elástica',
    description: 'Aplicação web global para consumidores finais com frontend SPA (React/Vue), CDN com cache na borda e backend 100% serverless com custo zero quando inativo.',
    workloadCharacteristics: {
      concurrency: 'De 0 a 100.000 requisições/minuto em campanhas de marketing',
      database: 'NoSQL de baixa latência (DynamoDB vs Cosmos DB)',
      framework: 'React / Next.js com backend em TypeScript',
      compliance: 'PCI-DSS para checkout de e-commerce e LGPD'
    },
    awsStack: {
      compute: 'AWS CloudFront (CDN) + S3 (Hosting SPA) + AWS Lambda via API Gateway HTTP',
      storage: 'Amazon DynamoDB com On-Demand Capacity (cobrança por leitura/escrita real)',
      cicd: 'GitHub Actions com invalidação automática de cache no CloudFront',
      functions: 'AWS Lambda em Node.js com provisionamento instantâneo via microVM Firecracker',
      networking: 'CloudFront Edge com AWS WAF e Shield Standard anti-DDoS gratuito',
      estimatedCostTier: '$ (Extremamente econômico, escala para zero real)',
      architectureNotes: 'A clássica arquitetura "Serverless Triad" da AWS (S3 + CloudFront + Lambda + DynamoDB). Praticamente inquebrável sob picos e com custo irrisório quando ocioso.'
    },
    azureStack: {
      compute: 'Azure Static Web Apps (SWA) com Enterprise Edge (Cloudflare global) embutido',
      storage: 'Azure Cosmos DB com modo Serverless (cobrança por Request Units - RUs consumidas)',
      cicd: 'GitHub Actions nativo configurado automaticamente no momento de criação do SWA',
      functions: 'Azure Functions integradas nativamente na mesma rota do Azure Static Web Apps',
      networking: 'Azure Front Door / Enterprise Edge com SSL gerenciado gratuito',
      estimatedCostTier: '$ (Muito econômico com camada gratuita generosa no Static Web Apps)',
      architectureNotes: 'O Azure Static Web Apps entrega a experiência de desenvolvimento mais integrada do mercado para frontends modernos, unindo hosting estático e backend serverless sob o mesmo domínio.'
    },
    decisionRationale: 'A AWS possui a arquitetura serverless mais madura e testada sob estresse planetário (Lambda + DynamoDB). Por outro lado, para equipes ágeis que valorizam conveniência máxima, o Azure Static Web Apps empacota CDN, roteamento de API, certificados e autenticação social em uma única solução.'
  }
];
