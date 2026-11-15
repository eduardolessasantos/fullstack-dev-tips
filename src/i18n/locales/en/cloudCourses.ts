import { CloudCoursesLocale } from '../../types.ts';

const cloudCoursesEn: CloudCoursesLocale = {
  cloudUi: {
    updatedLabel: 'Updated 2024/2025',
    awsBadgeLabel: 'AWS',
    azureBadgeLabel: 'Microsoft Azure',
    vsLabel: 'vs',
    titleBefore: 'Cloud Comparison:',
    titleVs: 'vs',
    subtitle:
      'Unbiased, hands-on engineering comparison between the world’s two largest cloud providers across everyday production needs: Storage, Deploy, CI/CD, and Serverless Functions.',
    pillarStorageTitle: 'Storage',
    pillarStorageSub: 'S3 vs Blob • EBS vs Managed Disks',
    pillarDeployTitle: 'Deploy & Containers',
    pillarDeploySub: 'ECS / App Runner vs Container Apps',
    pillarCicdTitle: 'CI / CD Pipelines',
    pillarCicdSub: 'CodePipeline vs GitHub Actions / DevOps',
    pillarFunctionsTitle: 'Functions (Serverless)',
    pillarFunctionsSub: 'AWS Lambda vs Azure Functions',
    winnerLabel: 'Advantage:',
    winnerTie: 'Technical Tie',
    keyFeaturesLabel: 'Key Capabilities',
    strengthsLabel: 'Strengths',
    weaknessesLabel: 'Trade-offs & Limits',
    pricingLabel: 'Baseline Pricing Model:',
    hideCodeLabel: 'Hide Real Infrastructure / Code Snippet',
    viewCodeLabel: 'View Side-by-Side Infrastructure / Code Snippet',
    deepDiveTagSuffix: 'IaC & Code',
    awsShortBadge: 'AWS',
    azureShortBadge: 'Azure',
    defaultAwsCodeTitle: 'AWS Sample',
    defaultAzureCodeTitle: 'Azure Sample',
    metricsTitle: 'Operational Metrics Comparison',
    metricLatency: 'Latency',
    metricScalability: 'Scalability',
    metricDx: 'Developer Experience',
    metricEcosystem: 'Ecosystem & Integration',
    deepDiveLabel: 'Deep Dive:',
    verdictSummaryLabel: 'Executive Verdict',
    whenAwsLabel: 'When to choose AWS:',
    whenAzureLabel: 'When to choose Azure:',
    simulatorBadge: 'Cloud Architecture Simulator',
    simulatorTitle: 'Which cloud fits your real-world workload?',
    simulatorSubtitle:
      'Pick one of the workloads below to compare side-by-side infrastructure designs on AWS and Microsoft Azure.',
    activeScenarioLabel: 'Active Scenario',
    simulateStackLabel: 'Simulate Stack',
    awsStackHeader: 'Recommended Architecture • AWS',
    azureStackHeader: 'Recommended Architecture • Microsoft Azure',
    awsNotesLabel: 'AWS Architecture Notes:',
    azureNotesLabel: 'Azure Architecture Notes:',
    workloadConcurrency: 'Concurrency:',
    workloadDatabase: 'Database:',
    workloadFramework: 'Framework / Stack:',
    workloadCompliance: 'Compliance:',
    computeLabel: 'Compute / Deploy',
    storageLabel: 'Storage / Data',
    cicdLabel: 'CI / CD & Pipelines',
    functionsLabel: 'Serverless Functions',
    networkingLabel: 'Networking & Security',
    costEstimateLabel: 'Cost Estimate Tier:',
    rationaleTitle: 'Decision Rationale (Why choose?)',
    mappingTable: {
      title: 'Quick Equivalence Map: AWS ⇄ Microsoft Azure',
      subtitle: 'Pocket reference for architects and engineers switching between both cloud providers.',
      colDomain: 'Domain / Requirement',
      colAws: 'Amazon Web Services (AWS)',
      colAzure: 'Microsoft Azure',
      colDiff: 'Key Differentiator',
      rows: [
        {
          domain: 'Object Storage (Files)',
          aws: 'Amazon S3',
          azure: 'Azure Blob Storage (ADLS Gen2)',
          diff: 'S3 leads universal tooling; Blob offers lower Hot storage cost/GB and hierarchical directories.'
        },
        {
          domain: 'Block Storage (VM Disks)',
          aws: 'Amazon EBS (gp3 / io2)',
          azure: 'Azure Managed Disks (Premium v2 / Ultra)',
          diff: 'gp3 decouples IOPS from disk size across every region; Azure adds native ZRS and Shared Disks.'
        },
        {
          domain: 'Serverless Containers',
          aws: 'Amazon ECS (Fargate) / App Runner',
          azure: 'Azure Container Apps (ACA)',
          diff: 'ACA embeds KEDA and scales to 0 replicas with zero idle billing.'
        },
        {
          domain: 'Managed Web PaaS',
          aws: 'Elastic Beanstalk / App Runner',
          azure: 'Azure App Service',
          diff: 'App Service includes instant zero-downtime Deployment Slots (Staging ⇄ Prod).'
        },
        {
          domain: 'CI / CD Pipelines',
          aws: 'CodePipeline / CodeBuild',
          azure: 'GitHub Actions / Azure DevOps',
          diff: 'GitHub Actions (Microsoft) dominates DX with federated OIDC authentication.'
        },
        {
          domain: 'Serverless Functions',
          aws: 'AWS Lambda',
          azure: 'Azure Functions',
          diff: 'Lambda bursts up to 3k instances/min; Azure offers Durable Functions and declarative bindings.'
        },
        {
          domain: 'Managed Kubernetes',
          aws: 'Amazon EKS',
          azure: 'Azure Kubernetes Service (AKS)',
          diff: 'EKS charges $73/mo per control plane; AKS standard control plane is free.'
        }
      ]
    },
    ctaBadge: 'Next Practical Step',
    ctaDecisionTitle: 'Pair your Cloud choice with the right Application Stack',
    ctaDecisionDesc:
      'Try our Architectural Decision Matrix or simulate your end-to-end project budget in the Business section.',
    ctaDecisionBtn: 'Open Decision Matrix',
    ctaBusinessBtn: 'Simulate Budget (Business)'
  },
  cloudCategories: [
    { id: 'all', label: 'Overview' },
    { id: 'storage', label: '1. Storage' },
    { id: 'deploy', label: '2. Deploy & Hosting' },
    { id: 'cicd', label: '3. CI / CD & Automation' },
    { id: 'functions', label: '4. Functions (Serverless)' },
    { id: 'scenarios', label: 'Architecture Simulator' }
  ],
  cloudComparisons: [
    {
      category: 'storage',
      title: 'Object Storage: Amazon S3 vs Azure Blob Storage',
      subtitle: 'Unstructured object storage, Data Lakes, static assets, and enterprise backups.',
      aws: {
        serviceName: 'Amazon S3 (Simple Storage Service)',
        icon: 'AWS-S3',
        keyFeatures: [
          'Strong read-after-write consistency across all PUTs and DELETEs',
          'Tiers: Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier Flexible, Glacier Deep Archive',
          'Fine-grained temporary pre-signed URLs for direct client uploads',
          'S3 Object Lambda to transform objects on the fly without duplicating data',
          'Cross-Region Replication (CRR) and Same-Region Replication (SRR)'
        ],
        strengths: [
          'Undisputed industry standard with SDKs in every runtime',
          'Intelligent-Tiering moves cold objects automatically without unexpected retrieval fees',
          'Battle-tested massive throughput for Data Lakes and analytics clusters'
        ],
        weaknesses: [
          'Expensive public internet Data Egress fees out of AWS',
          'Historical IAM bucket policies and ACLs require careful auditing'
        ],
        pricingModel: '$0.023/GB (Standard first 50 TB) + $0.005 per 1,000 PUT/COPY requests + egress',
        codeSampleTitle: 'Pre-Signed Upload URL in Node.js (AWS SDK v3)',
        codeSampleLang: 'typescript',
        codeSample: `import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "us-east-1" });

export async function generateUploadUrl(fileName: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: "company-assets-prod",
    Key: \`uploads/\${Date.now()}-\${fileName}\`,
    ContentType: contentType,
  });

  // Valid for 15 minutes
  return await getSignedUrl(s3, command, { expiresIn: 900 });
}`
      },
      azure: {
        serviceName: 'Azure Blob Storage (Azure Storage)',
        icon: 'Azure-Blob',
        keyFeatures: [
          'Storage Accounts and Containers hierarchy',
          'Tiers: Hot, Cool, Cold, Archive with lifecycle management rules',
          'Shared Access Signatures (SAS Tokens) delegated via Microsoft Entra ID',
          'Azure Data Lake Storage Gen2 (ADLSv2) with true hierarchical namespaces',
          'Flexible geo-redundancy (LRS, ZRS, GRS, GZRS, RA-GRS)'
        ],
        strengths: [
          'True hierarchical directory operations accelerate atomic Data Lake renames',
          'Seamless integration with Microsoft Fabric, Synapse Analytics, and .NET',
          'User Delegation SAS via Managed Identities prevents leaked master keys'
        ],
        weaknesses: [
          'Archive tier rehydration can take up to 15 hours unless using high-priority tiers',
          'Tier transitions require careful planning around write/early-delete charges'
        ],
        pricingModel: '$0.018/GB (Hot first 50 TB) + $0.005 per 10,000 write ops + egress',
        codeSampleTitle: 'Delegated SAS Upload in C# (.NET 8)',
        codeSampleLang: 'csharp',
        codeSample: `using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using Azure.Identity;

var blobServiceClient = new BlobServiceClient(
    new Uri("https://mystorage.blob.core.windows.net"),
    new DefaultAzureCredential());

var containerClient = blobServiceClient.GetBlobContainerClient("documents");
var blobClient = containerClient.GetBlobClient($"invoice-{Guid.NewGuid()}.pdf");

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
        'Both deliver 11 nines (99.999999999%) durability and strong consistency. Amazon S3 shines for Intelligent-Tiering and universal ecosystem tooling, whereas Azure Blob Storage stands out in enterprise analytics via ADLS Gen2 directories and lower Hot tier per-GB rates.',
      verdict: {
        winner: 'tie',
        summary:
          'Technical tie. Pick S3 for universal open-source compatibility and Intelligent-Tiering; pick Azure Blob for Microsoft-integrated Data Lakes and lower Hot storage rates.',
        recommendedWhenAWS:
          'When you need universal ecosystem support, mature Terraform providers, or tight AWS Lambda and Athena pipelines.',
        recommendedWhenAzure:
          'When you need hierarchical Data Lakes (ADLSv2), Power BI/Synapse workflows, or unified Microsoft Entra ID governance.'
      },
      metrics: {
        latency: { aws: '~10-15ms time-to-first-byte (Standard)', azure: '~12-18ms time-to-first-byte (Hot)' },
        scalability: { aws: '3,500 PUT/s & 5,500 GET/s per prefix', azure: 'Up to 20,000 ops/s per Storage Account' },
        developerExperience: { aws: 'Excellent (modular SDK v3 & fast CLI)', azure: 'Very good (unified SDK + DefaultAzureCredential)' },
        integrationEcosystem: { aws: 'Market leader (universal)', azure: 'Strong across Microsoft 365 & Databricks' }
      }
    },
    {
      category: 'storage',
      title: 'Block Storage: AWS EBS vs Azure Managed Disks',
      subtitle: 'Low-latency block volumes for relational databases (PostgreSQL, SQL Server) and heavy I/O.',
      aws: {
        serviceName: 'Amazon Elastic Block Store (EBS)',
        icon: 'AWS-EBS',
        keyFeatures: [
          'Types: gp3 (configurable General Purpose), io2 Block Express, st1, sc1',
          'EBS gp3 decouples IOPS (3,000 base to 16,000) and Throughput (125 to 1,000 MB/s) from volume size',
          'io2 Block Express delivers up to 256,000 IOPS and sub-millisecond latency',
          'Multi-Attach on io2 for Nitro clustered workloads',
          'Incremental snapshots stored natively inside Amazon S3'
        ],
        strengths: [
          'EBS gp3 offers the best price-performance in cloud block storage without overprovisioning disk GBs',
          'Consistent sub-millisecond latency on io2 Block Express for mission-critical OLTP'
        ],
        weaknesses: [
          'Volumes remain scoped to a single Availability Zone (AZ)',
          'Live volume modifications trigger a cooldown period before further changes'
        ],
        pricingModel: 'gp3: $0.08/GB-mo (includes 3,000 IOPS & 125 MB/s) + $0.005/extra IOPS',
        codeSampleTitle: 'Terraform EBS gp3 Provisioning with Provisioned IOPS',
        codeSampleLang: 'hcl',
        codeSample: `resource "aws_ebs_volume" "postgres_data" {
  availability_zone = "us-east-1a"
  size              = 100 # GB
  type              = "gp3"
  iops              = 6000 # decoupled from capacity
  throughput        = 250  # MB/s
  encrypted         = true

  tags = {
    Environment = "Production"
    Workload    = "PostgreSQL-OLTP"
  }
}`
      },
      azure: {
        serviceName: 'Azure Managed Disks',
        icon: 'Azure-Disks',
        keyFeatures: [
          'Tiers: Standard HDD, Standard SSD, Premium SSD v1, Premium SSD v2, Ultra Disk',
          'Premium SSD v2 decouples IOPS and MB/s flexibly similar to EBS gp3',
          'Ultra Disk scales up to 160,000 IOPS and 4,000 MB/s below 1ms',
          'Shared Disks with SCSI PR for Windows Failover Clusters (WSFC) and Pacemaker',
          'Zone-Redundant Storage (ZRS) replicating synchronous block writes across 3 zones'
        ],
        strengths: [
          'ZRS Managed Disks enable cross-zone VM failover while retaining shared block state',
          'First-class support for enterprise SQL Server Always On FCI clusters'
        ],
        weaknesses: [
          'Legacy Premium SSD v1 ties IOPS strictly to disk capacity',
          'Ultra Disks lack native inline snapshot/backup parity in some scenarios'
        ],
        pricingModel: 'Premium SSD v2: ~$0.073/GB-mo + 3,000 baseline IOPS + $0.005/extra IOPS',
        codeSampleTitle: 'Bicep Template for Premium SSD v2',
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
      deepDiveAnalysis:
        'AWS transformed cloud block pricing with EBS gp3 by decoupling IOPS/throughput from capacity, and Azure matched with Premium SSD v2. Azure differentiates itself via Zone-Redundant (ZRS) disks and Shared SCSI reservations for traditional failover clusters.',
      verdict: {
        winner: 'aws',
        summary: 'AWS edges ahead thanks to universal regional availability of EBS gp3 and seamless incremental S3 snapshots.',
        recommendedWhenAWS: 'Linux database instances (PostgreSQL, MySQL, Redis) optimizing cost/IOPS with gp3.',
        recommendedWhenAzure: 'Enterprise Windows SQL Server Failover Clusters (WSFC) or mandatory ZRS multi-zone disks.'
      },
      metrics: {
        latency: { aws: '0.8ms–1.5ms (gp3) / <0.5ms (io2)', azure: '1.0ms–2.0ms (Premium v2) / <1.0ms (Ultra)' },
        scalability: { aws: 'Up to 64 TB per volume', azure: 'Up to 64 TB per volume' },
        developerExperience: { aws: 'Excellent (mature Terraform & APIs)', azure: 'Very good (clear portal & az disk CLI)' },
        integrationEcosystem: { aws: 'EC2 Nitro, EKS CSI Driver', azure: 'Azure VMs, AKS CSI Driver, Azure Backup' }
      }
    },
    {
      category: 'deploy',
      title: 'Hosting & Containers: AWS (App Runner / ECS) vs Azure (Container Apps / App Service)',
      subtitle: 'Deploying REST APIs, Dockerized microservices, and elastic web workloads.',
      aws: {
        serviceName: 'AWS App Runner & Amazon ECS (Fargate)',
        icon: 'AWS-ECS',
        keyFeatures: [
          'App Runner: managed PaaS building and running containers straight from Git or ECR',
          'ECS Fargate: serverless container orchestration without managing Kubernetes nodes',
          'Granular container-level IAM Task Roles',
          'Service Connect for lightweight service discovery without heavy meshes',
          'Tight integration with Application Load Balancer (ALB) and AWS WAF'
        ],
        strengths: [
          'ECS Fargate is operationally simpler and more predictable than EKS for 80% of teams',
          'Up to 70% savings with Savings Plans and Fargate Spot',
          'Strict container IAM isolation'
        ],
        weaknesses: [
          'App Runner lacks true scale-to-zero and complex VPC egress customization',
          'ECS concepts (Task Definitions, Services) are proprietary to AWS'
        ],
        pricingModel: 'Fargate: ~$0.04048/vCPU-hr + $0.004445/GB-hr (per-second billing)',
        codeSampleTitle: 'ECS Fargate Task Definition JSON',
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
      "portMappings": [{ "containerPort": 8080, "protocol": "tcp" }]
    }
  ]
}`
      },
      azure: {
        serviceName: 'Azure Container Apps (ACA) & Azure App Service',
        icon: 'Azure-ACA',
        keyFeatures: [
          'Container Apps: managed Kubernetes + KEDA under the hood with true scale-to-zero',
          'App Service: mature PaaS featuring zero-downtime Deployment Slots (Staging ➔ Production swap)',
          'Native Dapr support for pub/sub and state management',
          'Built-in Envoy proxy with weighted traffic splitting for Canary releases',
          'Free auto-renewed managed TLS certificates'
        ],
        strengths: [
          'Scale to 0 replicas eliminates idle costs for bursty microservices',
          'App Service Deployment Slots remain best-in-class for instant blue/green swaps',
          'KEDA scales on queue depth (Service Bus, RabbitMQ, Kafka) with zero custom autoscaler code'
        ],
        weaknesses: [
          'Cold start latency occurs when scaling ACA from 0 to 1 replica',
          'Dedicated App Service Premium v3 plans carry a higher baseline price'
        ],
        pricingModel: 'Container Apps: 180k vCPU-s & 360k GB-s free monthly; then ~$0.000024/vCPU-s',
        codeSampleTitle: 'Bicep Template for Azure Container Apps (Scale-to-Zero)',
        codeSampleLang: 'bicep',
        codeSample: `resource containerApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: 'api-backend-app'
  location: resourceGroup().location
  properties: {
    managedEnvironmentId: acaEnv.id
    configuration: {
      ingress: { external: true, targetPort: 8080 }
    }
    template: {
      containers: [{ name: 'api', image: 'myacr.azurecr.io/api:latest', resources: { cpu: json('0.5'), memory: '1.0Gi' } }]
      scale: { minReplicas: 0, maxReplicas: 10 }
    }
  }
}`
      },
      deepDiveAnalysis:
        'ECS Fargate excels in battle-tested production stability. Azure pulls ahead in modern container ergonomics with Container Apps (KEDA + scale-to-zero) and App Service Deployment Slots for safe zero-downtime releases.',
      verdict: {
        winner: 'azure',
        summary: 'Azure wins for modern containerized microservices thanks to Container Apps scale-to-zero/KEDA and App Service Deployment Slots.',
        recommendedWhenAWS: 'High-scale always-on container services requiring dead-simple ECS Fargate operations.',
        recommendedWhenAzure: 'Workloads needing scale-to-zero cost savings, KEDA event scaling, or .NET Deployment Slots.'
      },
      metrics: {
        latency: { aws: 'ALB routing adds ~1–3ms', azure: 'Envoy Ingress adds ~2–4ms' },
        scalability: { aws: 'Linear task scaling in ~30–60s', azure: 'KEDA scales on queue events in seconds' },
        developerExperience: { aws: 'Moderate (requires ALB + Target Group + Task)', azure: 'Excellent (ACA bundles ingress & TLS)' },
        integrationEcosystem: { aws: 'AWS IAM, CloudWatch, ECR, Route53', azure: 'Entra ID, Log Analytics, ACR, App Insights' }
      }
    },
    {
      category: 'cicd',
      title: 'CI / CD: AWS CodePipeline / CodeBuild vs Azure DevOps / GitHub Actions',
      subtitle: 'Automated test suites, Docker builds, and secure production delivery pipelines.',
      aws: {
        serviceName: 'AWS CodePipeline, CodeBuild & CodeDeploy',
        icon: 'AWS-CodePipeline',
        keyFeatures: [
          'CodeBuild: ephemeral on-demand build runners supporting Docker-in-Docker',
          'CodeDeploy: Blue/Green & Canary rollouts with CloudWatch alarm rollbacks',
          'CodePipeline: visual multi-stage release orchestrator',
          'Passwordless internal authentication via AWS IAM Roles'
        ],
        strengths: [
          'Runs inside private VPC subnets without exposing internal endpoints',
          'Automatic rollback triggered directly by CloudWatch 5xx alarms'
        ],
        weaknesses: [
          'Verbose configuration and dated console UX compared to GitHub Actions',
          'AWS deprecated new onboarding for CodeCommit, steering teams to GitHub/GitLab'
        ],
        pricingModel: '$1.00/active pipeline/month + $0.005/min on CodeBuild (general1.small)',
        codeSampleTitle: 'GitHub Actions Pipeline with AWS OIDC (No Static Keys)',
        codeSampleLang: 'yaml',
        codeSample: `name: Deploy to Amazon ECS
on:
  push:
    branches: [ main ]
permissions:
  id-token: write
  contents: read
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789:role/GitHubActionsECSRole
          aws-region: us-east-1`
      },
      azure: {
        serviceName: 'Azure DevOps Pipelines & GitHub Actions',
        icon: 'Azure-DevOps',
        keyFeatures: [
          'Azure Pipelines: multi-OS hybrid runners (Linux, Windows, macOS) in YAML',
          'GitHub Actions: world’s largest CI/CD action marketplace',
          'Workload Identity Federation (OIDC) eliminating stored Service Principal secrets',
          'Manual environment approval gates and release audit logs'
        ],
        strengths: [
          'Superior DX across GitHub Actions and Azure DevOps',
          'Full commit-to-PR-to-deployment traceability',
          'Multi-cloud friendly (deploys cleanly to Azure, AWS, and on-prem)'
        ],
        weaknesses: [
          'Windows/macOS hosted runners consume free minutes at higher multipliers'
        ],
        pricingModel: 'GitHub: 2,000 free mins/mo; Azure DevOps: 1 free parallel job (1,800 mins/mo)',
        codeSampleTitle: 'GitHub Actions with Azure OIDC Federation',
        codeSampleLang: 'yaml',
        codeSample: `name: Deploy to Azure Container Apps
on:
  push:
    branches: [ main ]
permissions:
  id-token: write
  contents: read
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: azure/login@v2
        with:
          client-id: \${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: \${{ secrets.AZURE_TENANT_ID }}
          subscription-id: \${{ secrets.AZURE_SUBSCRIPTION_ID }}`
      },
      deepDiveAnalysis:
        'Even AWS-focused teams overwhelmingly pair AWS OIDC with GitHub Actions rather than CodePipeline. Microsoft owns both GitHub and Azure DevOps, delivering an unmatched developer ecosystem.',
      verdict: {
        winner: 'azure',
        summary: 'Clear win for Microsoft’s GitHub Actions + Azure DevOps ecosystem in developer experience, marketplace depth, and OIDC workflows.',
        recommendedWhenAWS: 'Combine GitHub Actions with AWS OIDC federation instead of AWS native pipeline UX.',
        recommendedWhenAzure: 'Adopt GitHub Actions or Azure DevOps natively with full Entra ID governance.'
      },
      metrics: {
        latency: { aws: 'CodeBuild boot ~20–40s', azure: 'GitHub Actions runner start ~5–15s' },
        scalability: { aws: 'Quota-based concurrent builds', azure: 'Massive ephemeral runner elasticity' },
        developerExperience: { aws: 'Low to Moderate', azure: 'Excellent (giant community marketplace)' },
        integrationEcosystem: { aws: 'AWS-centric', azure: 'Universal multi-cloud' }
      }
    },
    {
      category: 'functions',
      title: 'Serverless Functions: AWS Lambda vs Azure Functions',
      subtitle: 'Event-driven compute, lightweight APIs, async streams, and stateful orchestrations.',
      aws: {
        serviceName: 'AWS Lambda',
        icon: 'AWS-Lambda',
        keyFeatures: [
          'Runtimes: Node.js 20, Python 3.12, Java 21, .NET 8, Go, Custom Runtimes',
          'SnapStart reduces cold starts dramatically via memory snapshots',
          'Supports up to 10 GB container images in addition to 250 MB ZIPs',
          'Deep integration across 200+ AWS event sources (EventBridge, SQS, S3, DynamoDB)'
        ],
        strengths: [
          'Strict Firecracker microVM isolation with ultra-fast Node/Python cold starts (<150ms)',
          'Massive burst concurrency scaling thousands of instances per minute'
        ],
        weaknesses: [
          'Hard 15-minute execution timeout',
          'Per-request billing becomes pricey under steady 24/7 high volume'
        ],
        pricingModel: '1M free requests + 400k GB-s every month forever; then $0.20/1M requests',
        codeSampleTitle: 'Python AWS Lambda Handler with Powertools',
        codeSampleLang: 'python',
        codeSample: `from aws_lambda_powertools import Logger, Tracer
from aws_lambda_powertools.event_handler import APIGatewayRestResolver

logger = Logger()
tracer = Tracer()
app = APIGatewayRestResolver()

@app.get("/orders/<order_id>")
def get_order(order_id: str):
    logger.info(f"Fetching order {order_id}")
    return {"id": order_id, "status": "Processed", "total": 149.90}`
      },
      azure: {
        serviceName: 'Azure Functions',
        icon: 'Azure-Functions',
        keyFeatures: [
          'Runtimes: .NET 8 Isolated Worker (Native AOT), Python, Node.js, Java, PowerShell',
          'Flex Consumption Plan brings fast VNet integration plus scale-to-zero',
          'Declarative Triggers & Input/Output Bindings eliminate boilerplate SDK code',
          'Durable Functions for stateful workflows right inside code'
        ],
        strengths: [
          'Durable Functions simplify Fan-out/Fan-in and human-approval workflows cleanly in C#/TS',
          'Bindings slash infrastructure boilerplate by ~50%',
          '.NET 8 Native AOT starts under 50ms'
        ],
        weaknesses: [
          'Classic Consumption Java/Python cold starts lag behind Lambda',
          'Local binding debugging works best with Azure Core Tools / VS Code'
        ],
        pricingModel: '1M free requests + 400k GB-s/month; Flex Consumption billed per active usage',
        codeSampleTitle: '.NET 8 Azure Function with Output Binding',
        codeSampleLang: 'csharp',
        codeSample: `[Function("ProcessOrder")]
public OrderOutput Run(
    [HttpTrigger(AuthorizationLevel.Function, "post", Route = "orders")] HttpRequestData req)
{
    var order = new Order { Id = Guid.NewGuid().ToString(), Status = "Approved" };
    var response = req.CreateResponse(HttpStatusCode.Created);
    response.WriteAsJsonAsync(order);
    return new OrderOutput { HttpResponse = response, QueueMessage = order };
}`
      },
      deepDiveAnalysis:
        'AWS Lambda sets the bar for burst throughput and EventBridge event routing. Azure Functions counters with Durable Functions and declarative Bindings that shrink glue code dramatically.',
      verdict: {
        winner: 'tie',
        summary: 'High-level tie. Pick Lambda for bursty EventBridge/DynamoDB pipelines; pick Azure Functions for Durable workflows, .NET 8, and declarative bindings.',
        recommendedWhenAWS: 'Pure event-driven microservices, Kinesis streams, and DynamoDB triggers.',
        recommendedWhenAzure: 'Long-running stateful Durable workflows or C# / .NET 8 microservices.'
      },
      metrics: {
        latency: { aws: 'Cold start: ~120ms Node / ~180ms Python', azure: 'Cold start: ~150ms Node / ~35ms .NET AOT' },
        scalability: { aws: 'Up to 3,000 burst instances in minute 1', azure: 'Granular KEDA + Flex Consumption scaling' },
        developerExperience: { aws: 'Excellent with SAM, CDK, or Serverless', azure: 'Excellent inside VS Code & Visual Studio' },
        integrationEcosystem: { aws: 'EventBridge, SQS, SNS, DynamoDB', azure: 'Event Grid, Service Bus, Cosmos DB' }
      }
    }
  ],
  cloudScenarios: [
    {
      id: 'enterprise-dotnet',
      title: 'Enterprise .NET 8 & Transactional SQL Platform',
      badge: 'Enterprise • High Reliability',
      description: 'Mission-critical ERP/financial suite needing complex domain rules, corporate SSO, and zero-downtime releases.',
      workloadCharacteristics: {
        concurrency: '5,000 concurrent corporate users',
        database: 'Strict ACID Relational with audit log history',
        framework: 'ASP.NET Core 8 Web API & React',
        compliance: 'GDPR/LGPD, SOC 2, 5-year audit retention'
      },
      awsStack: {
        compute: 'AWS ECS Fargate behind multi-AZ Application Load Balancer (ALB)',
        storage: 'EBS gp3 database storage + Amazon S3 with Object Lock for audit archives',
        cicd: 'GitHub Actions via AWS OIDC pushing to Amazon ECR',
        functions: 'AWS Lambda (.NET 8) triggered by SQS for async PDF reports',
        networking: 'Private VPC with NAT Gateways across 3 AZs and AWS WAF',
        estimatedCostTier: '$$$ (Medium-High with NAT Gateway & ALB charges)',
        architectureNotes: 'Rock-solid resilience; requires explicit IAM roles and ECS Task Definitions.'
      },
      azureStack: {
        compute: 'Azure App Service (Premium v3) with Deployment Slots OR Azure Container Apps',
        storage: 'Azure SQL Managed Instance + Azure Blob Storage with Immutability Policies',
        cicd: 'Azure DevOps / GitHub Actions integrated natively with Entra ID',
        functions: 'Azure Functions (.NET 8 Isolated) + Durable Functions for reconciliation',
        networking: 'Azure VNet with Private Endpoints + Azure Front Door WAF',
        estimatedCostTier: '$$$ (Competitive via Azure Hybrid Benefit on Windows/SQL licenses)',
        architectureNotes: 'Native home for .NET teams—Deployment Slots eliminate release downtime.'
      },
      decisionRationale:
        'Microsoft Azure delivers standout value for .NET enterprise stacks via Azure Hybrid Benefit, native Microsoft Entra ID SSO, and App Service Deployment Slots.'
    },
    {
      id: 'python-ai-async',
      title: 'Python Data Processing & AI Inference API',
      badge: 'Data Science • Machine Learning',
      description: 'Document ingestion pipeline performing text extraction, vector embeddings (RAG), and LLM inference.',
      workloadCharacteristics: {
        concurrency: 'Bursty traffic with heavy CPU/GPU bursts',
        database: 'Relational + pgvector / managed vector index',
        framework: 'FastAPI (Python 3.12) + Celery / Queues',
        compliance: 'Isolated training payloads and TLS in transit'
      },
      awsStack: {
        compute: 'AWS ECS Fargate with G5 GPU workers + App Runner for FastAPI',
        storage: 'Amazon S3 + S3 Express One Zone for microsecond dataset reads',
        cicd: 'GitHub Actions pushing Docker images to Amazon ECR',
        functions: '10 GB Container AWS Lambda + Step Functions',
        networking: 'VPC with private S3/DynamoDB Gateway Endpoints',
        estimatedCostTier: '$$$$ (High GPU & data I/O spend)',
        architectureNotes: 'Market-leading open-source ML ecosystem via Amazon Bedrock and SageMaker.'
      },
      azureStack: {
        compute: 'Azure Container Apps with dedicated GPU workload profiles',
        storage: 'Azure Blob Storage with ADLS Gen2 hierarchical datasets',
        cicd: 'GitHub Actions pushing directly to Azure Container Registry (ACR)',
        functions: 'Python Azure Functions with KEDA queue autoscaling',
        networking: 'Private VNet linked over Private Link to Azure OpenAI Service',
        estimatedCostTier: '$$$$ (Competitive when using private GPT-4o Azure OpenAI tenants)',
        architectureNotes: 'Unmatched if corporate security requires private OpenAI deployments.'
      },
      decisionRationale:
        'Choose Azure when enterprise compliance mandates private Azure OpenAI models; choose AWS for custom model training and open-source Big Data pipelines.'
    },
    {
      id: 'serverless-web-spa',
      title: 'Modern Global Web Portal & Elastic Serverless APIs',
      badge: 'Modern Web • Elastic Scale',
      description: 'Consumer SPA (React/Vue) paired with edge CDN caching and 100% scale-to-zero serverless APIs.',
      workloadCharacteristics: {
        concurrency: '0 to 100,000 requests/min during campaign spikes',
        database: 'Low-latency NoSQL (DynamoDB vs Cosmos DB)',
        framework: 'React / Next.js + TypeScript APIs',
        compliance: 'PCI-DSS checkout & GDPR/LGPD'
      },
      awsStack: {
        compute: 'CloudFront CDN + S3 static hosting + API Gateway HTTP + Lambda',
        storage: 'Amazon DynamoDB in On-Demand capacity mode',
        cicd: 'GitHub Actions + automatic CloudFront invalidation',
        functions: 'Node.js AWS Lambda running on Firecracker microVMs',
        networking: 'CloudFront Edge + AWS WAF + Shield Standard',
        estimatedCostTier: '$ (Ultra-economical with real scale-to-zero)',
        architectureNotes: 'The classic AWS Serverless Triad proven at global scale.'
      },
      azureStack: {
        compute: 'Azure Static Web Apps (SWA) with Enterprise Edge',
        storage: 'Azure Cosmos DB Serverless (billed per RU consumed)',
        cicd: 'GitHub Actions auto-provisioned at SWA creation',
        functions: 'Integrated Azure Functions sharing the same origin domain',
        networking: 'Azure Front Door / Edge with free managed TLS',
        estimatedCostTier: '$ (Generous free tier inside Static Web Apps)',
        architectureNotes: 'Delivers the smoothest integrated DX uniting SPA hosting, auth, and serverless API routes.'
      },
      decisionRationale:
        'AWS offers the most battle-tested planetary serverless core; Azure Static Web Apps wins developer speed by bundling CDN, SSL, and API routing cleanly.'
    }
  ],
  coursesUi: {
    headerBadge: 'Courses & Certifications Showcase',
    headerTitle: 'Learning Tracks & Official Exam Roadmaps',
    headerSubtitle:
      'Complete study blueprints, modular syllabi, and week-by-week roadmaps to earn top cloud certifications (AWS, Azure, Terraform) and master Full-Stack engineering.',
    statPaths: 'Structured Tracks',
    statExams: 'Exams',
    statExamsSuffix: 'Mapped',
    statFocus: 'Engineering Focus',
    statFocusValue: '100% Hands-On',
    statAligned: 'Market-aligned study blueprints',
    statWeeklyPlans: 'With weekly schedules & deliverables',
    searchPlaceholder: 'Search track, exam code (e.g. SAA-C03, AZ-204), or technology...',
    levelFilterLabel: 'Level:',
    levelAll: 'All Levels',
    levels: [
      { id: 'Iniciante', label: 'Beginner' },
      { id: 'Intermediário', label: 'Intermediate' },
      { id: 'Avançado', label: 'Advanced' },
      { id: 'Especialista', label: 'Expert' }
    ],
    levelMap: {
      Iniciante: 'Beginner',
      Intermediário: 'Intermediate',
      Avançado: 'Advanced',
      Especialista: 'Expert'
    },
    categories: [
      { id: 'all', label: 'All Tracks' },
      { id: 'certifications', label: 'Official Certifications' },
      { id: 'backend', label: 'Backend & APIs' },
      { id: 'frontend', label: 'Modern Frontend' },
      { id: 'cloud', label: 'Cloud & DevOps' },
      { id: 'architecture', label: 'Data & Caching' }
    ],
    allFormationsTabPrefix: 'All',
    officialCertsTabPrefix: 'Official Certifications',
    showingCount: 'Showing',
    formationSingular: 'track found',
    formationPlural: 'tracks found',
    clearFilters: 'Clear filters',
    emptyTitle: 'No tracks match those filters',
    emptyDescBefore: 'No learning tracks found matching',
    emptyDescAfter: 'Reset filters to browse all available tracks.',
    resetBtn: 'Reset All Tracks',
    modulesUnit: 'modules',
    techStackLabel: 'Covered Stack & Tools',
    badgeExamPrefix: 'Exam:',
    viewCurriculumBtn: 'Explore Full Syllabus',
    targetAudienceLabel: 'Target Audience',
    prerequisitesLabel: 'Prerequisites',
    skillsLabel: 'Skills You Will Master',
    syllabusTab: 'Modular Syllabus',
    examTab: 'Exam Blueprint',
    roadmapTab: 'Weekly Plan',
    officialGuideBtn: 'Official Exam Guide',
    officialGuideLinkLabel: 'Open Official Certification Guide',
    relatedArticleBtn: 'Read Related Deep Dive',
    relatedArticleTitleAttr: 'Read related technical article',
    relatedCloudBtn: 'Compare Cloud Providers',
    relatedPageTitleAttr: 'Open related comparison section',
    closeModalBtn: 'Close Syllabus',
    modalTitleSuffix: 'Detailed Track Overview',
    modalFooterAttribution: 'Engineering track curated by CodeCompare',
    modulesTitle: 'Modules & Study Hours',
    topicsCountLabel: 'practical topics',
    examDomainsTitle: 'Official Exam Domains',
    examBlueprintPrefix: 'Official Blueprint',
    examBlueprintDesc: 'Approximate domain weighting evaluated on the official certification exam:',
    examWeightLabel: 'Weight:',
    weeklyPlanTitle: 'Recommended Weekly Schedule',
    deliverablesLabel: 'Hands-On Deliverable:'
  },
  formations: [
    {
      id: 'aws-saa-c03',
      title: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
      subtitle: 'Complete exam blueprint for designing resilient, cost-efficient distributed architectures on AWS.',
      category: 'certifications',
      provider: 'AWS',
      level: 'Intermediário',
      duration: '80 study hours recommended (8–10 weeks)',
      examCode: 'SAA-C03',
      badgeColor: 'amber',
      technologies: ['AWS IAM', 'EC2', 'S3', 'VPC', 'RDS', 'Aurora', 'DynamoDB', 'ECS/Fargate', 'Lambda', 'SQS/SNS', 'CloudWatch'],
      description: 'Validates your ability to architect secure, resilient, high-performing, and cost-optimized workloads across all 4 official AWS SAA-C03 exam domains.',
      targetAudience: 'Software engineers, solutions architects, systems analysts, and DevOps engineers leading AWS architecture.',
      prerequisites: ['Basic networking (IP, DNS, CIDR, subnets).', 'General web client-server and SQL/NoSQL concepts.'],
      skillsLearned: [
        'Design multi-AZ VPCs with public/private subnets, NAT Gateways, and Transit Gateway.',
        'Optimize storage using S3 Lifecycle/Glacier and EBS gp3/io2.',
        'Build event-driven architectures using SQS FIFO, SNS Fanout, and EventBridge.',
        'Architect Multi-AZ RDS/Aurora databases with ElastiCache Redis.',
        'Enforce least privilege security with IAM Policies, Roles, and KMS.'
      ],
      modules: [
        { title: 'Module 1: Security, IAM & VPC Networking', hours: '18h', topics: ['Least privilege IAM & SCPs', 'VPC Subnets & Route Tables', 'Security Groups vs NACLs', 'PrivateLink & Endpoints'] },
        { title: 'Module 2: Elastic Compute, Containers & Serverless', hours: '20h', topics: ['EC2 Spot & ASG', 'ALB vs NLB', 'ECS Fargate vs EKS', 'Lambda & Step Functions'] },
        { title: 'Module 3: Storage, Databases & Caching', hours: '22h', topics: ['EBS, EFS & S3 Classes', 'RDS Multi-AZ & Aurora', 'DynamoDB GSIs & Streams', 'ElastiCache & CloudFront'] },
        { title: 'Module 4: High Availability, DR & Cost Optimization', hours: '20h', topics: ['DR Patterns (Pilot Light to Active-Active)', 'SQS DLQ & Kinesis', 'CloudWatch & CloudTrail', 'Practice Exam Drills'] }
      ],
      examDomains: [
        { domain: 'Domain 1: Design Secure Architectures', weight: '30%', description: 'IAM, KMS encryption, VPC isolation, and perimeter security.' },
        { domain: 'Domain 2: Design Resilient Architectures', weight: '26%', description: 'Multi-AZ fault tolerance, queue decoupling, and Disaster Recovery.' },
        { domain: 'Domain 3: Design High-Performing Architectures', weight: '24%', description: 'Caching, low-latency databases, elastic compute, and throughput.' },
        { domain: 'Domain 4: Design Cost-Optimized Architectures', weight: '20%', description: 'Right-sizing, S3 lifecycle rules, serverless tiers, and egress optimization.' }
      ],
      officialGuideUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
      relatedPageId: 'cloud',
      weeklyPlan: [
        { week: 'Weeks 1–2', focus: 'Security, IAM & VPC Design', deliverables: 'Deploy a multi-AZ VPC with ALB, private instances, and NAT Gateway.' },
        { week: 'Weeks 3–4', focus: 'Compute, Scaling & Serverless', deliverables: 'Wire ASG behind ALB and trigger Lambda from S3 events.' },
        { week: 'Weeks 5–6', focus: 'Databases & S3 Lifecycle', deliverables: 'Launch RDS Read Replicas and S3 Glacier lifecycle policies.' },
        { week: 'Weeks 7–8', focus: 'DR & Mock Exams', deliverables: 'Score 80%+ consistently across 4 timed practice exams.' }
      ]
    },
    {
      id: 'azure-az-204',
      title: 'Microsoft Certified: Azure Developer Associate (AZ-204)',
      subtitle: 'Hands-on preparation for building end-to-end cloud-native applications on Microsoft Azure.',
      category: 'certifications',
      provider: 'Microsoft Azure',
      level: 'Intermediário',
      duration: '70 study hours recommended (7–9 weeks)',
      examCode: 'AZ-204',
      badgeColor: 'sky',
      technologies: ['Azure App Service', 'Azure Functions', 'Cosmos DB', 'Azure Blob Storage', 'Microsoft Entra ID', 'Key Vault', 'Event Grid', 'Service Bus'],
      description: 'Measures practical skill building secure, scalable solutions across Azure compute, storage, Entra ID security, and event messaging.',
      targetAudience: '.NET, Java, Python, and Node.js engineers deploying production workloads on Azure.',
      prerequisites: ['1–2 years programming experience (C#, Java, Python, or JS/TS).', 'Basic Azure Portal and CLI familiarity.'],
      skillsLearned: [
        'Deploy App Service Web Apps with zero-downtime Deployment Slots.',
        'Build event-driven Azure Functions & Durable orchestrations.',
        'Integrate Entra ID OAuth2 (MSAL) and passwordless Managed Identities.',
        'Model Cosmos DB partition keys and Request Units (RU/s).'
      ],
      modules: [
        { title: 'Module 1: Azure Compute Solutions', hours: '18h', topics: ['App Service & Deployment Slots', 'Container Apps (ACA)', 'Azure Functions Triggers & Bindings', 'Durable Functions'] },
        { title: 'Module 2: Storage & Cosmos DB', hours: '16h', topics: ['Blob Storage Tiers & SAS Tokens', 'Cosmos DB Partition Keys & Consistency', 'SDK operations in C# / Python'] },
        { title: 'Module 3: Azure Security & Identity', hours: '16h', topics: ['Microsoft Entra ID & MSAL', 'Managed Identities', 'Key Vault & App Configuration'] },
        { title: 'Module 4: Monitoring, Caching & Events', hours: '20h', topics: ['Azure Cache for Redis', 'Service Bus vs Storage Queues', 'Event Grid & Event Hubs', 'Application Insights'] }
      ],
      examDomains: [
        { domain: 'Develop Azure compute solutions', weight: '25-30%', description: 'App Service, Functions, Container Apps, and Durable orchestration.' },
        { domain: 'Develop for Azure storage', weight: '15-20%', description: 'Cosmos DB RU tuning & Blob Storage SAS.' },
        { domain: 'Implement Azure security', weight: '20-25%', description: 'Entra ID, Managed Identities, and Key Vault.' },
        { domain: 'Monitor, troubleshoot, and optimize', weight: '15-20%', description: 'Redis Cache and Application Insights telemetry.' },
        { domain: 'Connect to Azure & 3rd-party services', weight: '15-20%', description: 'Service Bus, Event Grid, and API Management.' }
      ],
      officialGuideUrl: 'https://learn.microsoft.com/certifications/exams/az-204/',
      relatedPageId: 'cloud',
      relatedArticleId: 'dotnet-minimal-apis',
      weeklyPlan: [
        { week: 'Weeks 1–2', focus: 'App Service Slots & Functions', deliverables: 'Ship an API using Deployment Slots and a Blob-triggered Function.' },
        { week: 'Weeks 3–4', focus: 'Cosmos DB & Blob SAS', deliverables: 'Build a Cosmos DB CRUD service with dynamic SAS generation.' },
        { week: 'Weeks 5–6', focus: 'Entra ID, Managed Identity & Key Vault', deliverables: 'Authenticate to Key Vault without stored secrets.' },
        { week: 'Weeks 7–8', focus: 'Service Bus, Telemetry & Mock Exams', deliverables: 'Implement Service Bus queues and pass AZ-204 practice sets.' }
      ]
    },
    {
      id: 'azure-az-305',
      title: 'Microsoft Certified: Azure Solutions Architect Expert (AZ-305)',
      subtitle: 'Expert-level credential covering enterprise governance, Hub-Spoke networking, and cloud migrations.',
      category: 'certifications',
      provider: 'Microsoft Azure',
      level: 'Especialista',
      duration: '90 study hours recommended (10–12 weeks)',
      examCode: 'AZ-305',
      badgeColor: 'sky',
      technologies: ['Azure Landing Zones', 'Azure Kubernetes (AKS)', 'ExpressRoute', 'Azure SQL Managed Instance', 'Azure Policy', 'Synapse Analytics', 'Azure Front Door'],
      description: 'Microsoft’s flagship architecture certification focused on multi-subscription governance, Hub-and-Spoke security, BCDR, and enterprise modernization.',
      targetAudience: 'Senior engineers, tech leads, and cloud architects designing mission-critical Azure topologies.',
      prerequisites: ['AZ-104 (Administrator) or AZ-204 prerequisite knowledge.', 'Deep enterprise networking and data governance background.'],
      skillsLearned: [
        'Architect Hub-and-Spoke topologies with Azure Firewall and ExpressRoute.',
        'Govern multi-tenant subscriptions via Management Groups and Azure Policy.',
        'Specify high-availability relational & NoSQL data topologies.',
        'Design BCDR plans meeting strict RTO/RPO SLA targets.'
      ],
      modules: [
        { title: 'Module 1: Governance, Identity & Networking', hours: '22h', topics: ['Management Groups & Policies', 'Hub-Spoke + ExpressRoute', 'Azure Front Door & WAF', 'Hybrid Identity & PIM'] },
        { title: 'Module 2: Compute & Orchestration Design', hours: '24h', topics: ['AKS CNI vs Kubenet', 'Confidential Computing', 'Bicep & Terraform IaC'] },
        { title: 'Module 3: Data Architecture & Analytics', hours: '22h', topics: ['Azure SQL Hyperscale vs Managed Instance', 'ADLS Gen2 POSIX ACLs', 'Data Factory & Synapse'] },
        { title: 'Module 4: Business Continuity & Migration', hours: '22h', topics: ['RTO/RPO with Azure Site Recovery', 'Rehost/Refactor/Rearchitect via Azure Migrate', 'Case study architecture drills'] }
      ],
      examDomains: [
        { domain: 'Identity, governance & monitoring', weight: '25-30%', description: 'Entra ID, PIM, Landing Zones, and Log Analytics.' },
        { domain: 'Data storage solutions', weight: '25-30%', description: 'SQL Hyperscale, geo-replicated Cosmos DB, and Data Lake.' },
        { domain: 'Business continuity solutions', weight: '10-15%', description: 'Backup, Disaster Recovery, and availability zones.' },
        { domain: 'Infrastructure & compute solutions', weight: '25-30%', description: 'AKS, App Service Environments, Hub-Spoke, and Front Door.' }
      ],
      officialGuideUrl: 'https://learn.microsoft.com/certifications/exams/az-305/',
      relatedPageId: 'cloud'
    },
    {
      id: 'cloud-fundamentals',
      title: 'Dual Cloud Foundations: AWS Cloud Practitioner (CLF-C02) & Azure Fundamentals (AZ-900)',
      subtitle: 'Gateway track mapping core IaaS/PaaS/SaaS concepts, pricing, and core services across AWS and Azure side by side.',
      category: 'certifications',
      provider: 'Full-Stack',
      level: 'Iniciante',
      duration: '40 study hours recommended (4 weeks)',
      examCode: 'CLF-C02 / AZ-900',
      badgeColor: 'emerald',
      technologies: ['Cloud Concepts', 'IaaS / PaaS / Serverless', 'TCO Pricing Models', 'Regions & AZs', 'Shared Responsibility', 'SLA & Reliability'],
      description: 'Teaches cloud computing fundamentals by directly translating services between AWS and Azure (EC2 vs VM, S3 vs Blob, IAM vs Entra ID) to prepare for both foundational exams.',
      targetAudience: 'Tech newcomers, junior developers, engineering managers, and product owners.',
      prerequisites: ['Basic web literacy.', 'No prior coding experience required.'],
      skillsLearned: [
        'Distinguish IaaS, PaaS, SaaS, and Serverless FaaS clearly.',
        'Apply the Shared Responsibility Model cleanly.',
        'Estimate TCO across AWS and Azure calculators.',
        'Translate the top 20 core services between AWS and Azure.'
      ],
      modules: [
        { title: 'Module 1: Universal Cloud Principles', hours: '10h', topics: ['Elasticity & Horizontal Scaling', 'CapEx vs OpEx', 'Public, Private & Hybrid Clouds'] },
        { title: 'Module 2: Global Infra & Compute', hours: '10h', topics: ['Regions, AZs & Edge POPs', 'EC2 vs VMs / Lambda vs Functions', 'Containers Intro'] },
        { title: 'Module 3: Storage, Databases & Networking', hours: '10h', topics: ['S3 vs Blob Storage', 'RDS/DynamoDB vs Azure SQL/Cosmos', 'VPC vs VNet'] },
        { title: 'Module 4: Security, Governance & Practice Sets', hours: '10h', topics: ['Shared Responsibility Model', 'Well-Architected & CAF', '50-question CLF-C02 / AZ-900 mocks'] }
      ],
      officialGuideUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
      relatedPageId: 'cloud'
    },
    {
      id: 'dotnet-microservices',
      title: '.NET 8 Enterprise Microservices Architect Track',
      subtitle: 'Master C# 12, high-throughput Minimal APIs, EF Core 8, Docker, RabbitMQ, and OpenTelemetry.',
      category: 'backend',
      provider: 'Full-Stack',
      level: 'Avançado',
      duration: '85 hours of deep lessons & labs',
      badgeColor: 'violet',
      technologies: ['C# 12', '.NET 8', 'Minimal APIs', 'Entity Framework Core 8', 'Docker', 'PostgreSQL', 'Redis', 'RabbitMQ', 'OpenTelemetry'],
      description: 'Deep backend track covering Native AOT, high-RPS Minimal APIs, EF Core query tuning, RabbitMQ/MassTransit resilience, and distributed tracing.',
      targetAudience: '.NET engineers transitioning from traditional monoliths to lean distributed microservices.',
      prerequisites: ['Intermediate C# and OOP skills.', 'Prior experience building basic REST APIs.'],
      skillsLearned: [
        'Build 45k+ RPS Minimal APIs in .NET 8.',
        'Optimize EF Core queries via AsNoTracking, Split Queries, and Compiled Queries.',
        'Implement idempotent RabbitMQ event pipelines with Outbox Pattern & Polly.',
        'Instrument OpenTelemetry traces across Prometheus and Grafana.'
      ],
      modules: [
        { title: 'Module 1: .NET 8 Core & Minimal APIs', hours: '20h', topics: ['C# 12 Primary Constructors', 'TypedResults & Endpoint Filters', 'Native AOT compilation'] },
        { title: 'Module 2: Persistence with EF Core 8 & PostgreSQL', hours: '20h', topics: ['Value Objects & Safe Migrations', 'EXPLAIN ANALYZE SQL profiling', 'Transactional Outbox Pattern'] },
        { title: 'Module 3: Async Messaging & Resilience', hours: '25h', topics: ['RabbitMQ + MassTransit Pub/Sub', 'Polly Retries, Circuit Breaker & DLQs', 'Idempotent Payment Handlers'] },
        { title: 'Module 4: Observability & Containers', hours: '20h', topics: ['Chiseled Ubuntu Multi-Stage Dockerfiles', 'OpenTelemetry + Jaeger', 'Kubernetes Health Checks'] }
      ],
      relatedArticleId: 'dotnet-minimal-apis',
      relatedPageId: 'backend',
      relatedTab: 'dotnet'
    },
    {
      id: 'python-fastapi',
      title: 'Modern Python & FastAPI API Engineering Track',
      subtitle: 'Build async enterprise services using Python 3.12, Clean Architecture, Pydantic v2, and SQLAlchemy 2.',
      category: 'backend',
      provider: 'Full-Stack',
      level: 'Intermediário',
      duration: '70 hours of labs & projects',
      badgeColor: 'amber',
      technologies: ['Python 3.12', 'FastAPI', 'AsyncIO', 'Pydantic v2', 'SQLAlchemy 2', 'Alembic', 'Pytest', 'Docker', 'JWT / OAuth2'],
      description: 'Elevate Python APIs beyond ad-hoc scripts with Rust-powered Pydantic v2 validation, asyncpg pooling, Clean Architecture, and 90%+ Pytest coverage.',
      targetAudience: 'Python backend engineers and data engineers deploying production APIs.',
      prerequisites: ['Intermediate Python (functions, decorators, classes).', 'Basic HTTP and relational SQL familiarity.'],
      skillsLearned: [
        'Master Python 3.12 AsyncIO internals with Uvicorn and uvloop.',
        'Validate schemas at native speed with Pydantic v2.',
        'Manage async SQLAlchemy 2 transactions and Alembic migrations.',
        'Secure APIs with JWT OAuth2 and test with Pytest fixtures.'
      ],
      modules: [
        { title: 'Module 1: FastAPI & AsyncIO Internals', hours: '16h', topics: ['Event Loop I/O vs CPU', 'APIRouter & OpenAPI', 'Custom Exception Handlers'] },
        { title: 'Module 2: Strong Validation with Pydantic v2', hours: '18h', topics: ['Rust Pydantic Core', 'Field & Model Validators', 'Typed pydantic-settings'] },
        { title: 'Module 3: Clean Architecture & SQLAlchemy 2', hours: '20h', topics: ['Domain/Repository separation', 'Asyncpg Declarative Mapping', 'Alembic Safe Migrations'] },
        { title: 'Module 4: Auth, Testing & Docker Deploy', hours: '16h', topics: ['JWT, Bcrypt & RBAC', 'Pytest Fixtures & TestClient', 'Gunicorn + Uvicorn Workers'] }
      ],
      relatedArticleId: 'fastapi-clean-architecture',
      relatedPageId: 'backend',
      relatedTab: 'python'
    },
    {
      id: 'angular-signals',
      title: 'Modern Frontend with Angular 17/18 & Signals',
      subtitle: 'Build Zoneless enterprise SPAs with surgical signal reactivity and Standalone Components.',
      category: 'frontend',
      provider: 'Full-Stack',
      level: 'Avançado',
      duration: '65 hours technical deep dive',
      badgeColor: 'rose',
      technologies: ['Angular 18', 'Signals', 'Computed', 'Effects', 'Standalone Components', 'TypeScript 5', 'RxJS Interop', 'Deferrable Views', 'SSR / Hydration'],
      description: 'Master Angular’s modern Signal architecture, Zoneless change detection, @defer blocks, and seamless RxJS interop.',
      targetAudience: 'Frontend engineers scaling complex corporate SPAs and financial dashboards.',
      prerequisites: ['Solid ES6+ JavaScript & TypeScript knowledge.', 'Prior web component experience.'],
      skillsLearned: [
        'Master signal(), computed(), and effect() primitives.',
        'Migrate legacy Zone.js apps toward Zoneless Signals.',
        'Use @if, @for tracking, and viewport @defer views.',
        'Bridge Streams and Signals via toSignal() / toObservable().'
      ],
      modules: [
        { title: 'Module 1: Fine-Grained Signal Reactivity', hours: '15h', topics: ['Signal Dependency Graphs', 'Computed & Safe Effects', '@if / @for / @defer control flow'] },
        { title: 'Module 2: Standalone & Functional DI', hours: '15h', topics: ['NgModule-free Architecture', 'inject() Function', 'Signal Stores'] },
        { title: 'Module 3: Signals + RxJS Interop', hours: '18h', topics: ['Synchronous UI vs Async Streams', 'toSignal & toObservable', 'HTTP Retry Flows'] },
        { title: 'Module 4: SSR, Hydration & Testing', hours: '17h', topics: ['Bundle Splitting with @defer', 'Non-Destructive Hydration', 'Vitest / Jasmine Testing'] }
      ],
      relatedArticleId: 'signals-reactivity',
      relatedPageId: 'frontend',
      relatedTab: 'angular'
    },
    {
      id: 'react-nextjs',
      title: 'React 19 & Next.js 14 / App Router Architect Track',
      subtitle: 'Master Server Components (RSC), Server Actions, React Compiler, TanStack Query v5, and Core Web Vitals.',
      category: 'frontend',
      provider: 'Full-Stack',
      level: 'Avançado',
      duration: '75 hours technical immersion',
      badgeColor: 'sky',
      technologies: ['React 19', 'Next.js 14', 'Server Components (RSC)', 'Server Actions', 'React Compiler', 'TanStack Query v5', 'Zustand', 'Tailwind CSS'],
      description: 'Combine React 19 ergonomics with Next.js App Router, multi-layer caching, optimistic mutations, and Core Web Vitals optimization.',
      targetAudience: 'React developers adopting full-stack Server Components and extreme web performance.',
      prerequisites: ['Intermediate React Hooks.', 'Solid TypeScript & REST API experience.'],
      skillsLearned: [
        'Separate Server vs Client Components cleanly.',
        'Ship zero-API mutations with Zod-validated Server Actions.',
        'Configure TanStack Query v5 stale-while-revalidate caches.',
        'Optimize LCP, INP, and CLS Core Web Vitals.'
      ],
      modules: [
        { title: 'Module 1: The React 19 Mental Model', hours: '18h', topics: ['React Compiler Auto-Memoization', 'use(), useOptimistic(), useActionState()', 'Built-in Metadata & Asset Loading'] },
        { title: 'Module 2: Next.js 14 App Router at Scale', hours: '20h', topics: ['Nested Layouts & Templates', 'Zero-JS Server Components', 'Zod Server Actions + revalidatePath'] },
        { title: 'Module 3: Caching & Client State', hours: '18h', topics: ['TanStack Query v5 Patterns', 'Zustand Stores', 'Next.js 4 Cache Layers'] },
        { title: 'Module 4: Web Vitals & Edge Deploy', hours: '19h', topics: ['Suspense Streaming SSR', 'LCP & INP Profiling', 'Vercel & Docker Production'] }
      ],
      relatedArticleId: 'ssr-edge-rendering',
      relatedPageId: 'frontend',
      relatedTab: 'react'
    },
    {
      id: 'terraform-devops',
      title: 'Infrastructure as Code with Terraform & DevOps Track',
      subtitle: 'Automate AWS/Azure provisioning using HCL, remote state locking, Docker, Kubernetes, and GitHub Actions.',
      category: 'cloud',
      provider: 'HashiCorp',
      level: 'Intermediário',
      duration: '60 hours hands-on curriculum',
      examCode: 'HashiCorp Terraform Associate (003)',
      badgeColor: 'purple',
      technologies: ['Terraform', 'HCL', 'AWS / Azure Providers', 'Docker', 'Kubernetes', 'GitHub Actions', 'Trivy', 'GitOps'],
      description: 'Turn manual cloud clicking into peer-reviewed, versioned HCL infrastructure modules with encrypted remote state and OIDC CI/CD pipelines.',
      targetAudience: 'Backend, cloud, and DevOps engineers automating reproducible multi-cloud environments.',
      prerequisites: ['Basic Git & Linux CLI.', 'General awareness of VMs, networks, and cloud storage.'],
      skillsLearned: [
        'Write clean modular HCL infrastructure code.',
        'Secure remote .tfstate with S3 + DynamoDB or Azure Storage locks.',
        'Build OIDC-authenticated GitHub Actions plan/apply pipelines.',
        'Scan IaC templates statically with Trivy and Tfsec.'
      ],
      modules: [
        { title: 'Module 1: Terraform Foundations & HCL', hours: '14h', topics: ['init / plan / apply lifecycle', 'Resources, Data Sources & Outputs', 'for_each & dynamic blocks'] },
        { title: 'Module 2: Remote State Security', hours: '16h', topics: ['Why .tfstate never hits Git', 'Encrypted State Locking', 'state mv / import recovery'] },
        { title: 'Module 3: Reusable Modules', hours: '15h', topics: ['VPC / Cluster Modules', 'Private Registry Versioning', 'Variable Validation Rules'] },
        { title: 'Module 4: GitOps CI/CD & Exam Drills', hours: '15h', topics: ['PR Plan Automation', 'OIDC Auth on AWS & Azure', 'Terraform Associate (003) Mocks'] }
      ],
      officialGuideUrl: 'https://www.hashicorp.com/certification/terraform-associate',
      relatedPageId: 'cloud'
    },
    {
      id: 'data-cache-arch',
      title: 'Data & Caching Engineering: Advanced PostgreSQL + Redis',
      subtitle: 'Master relational tuning, GIN/B-Tree indexes, high-scale JSONB partitioning, and defensive Redis caching.',
      category: 'architecture',
      provider: 'Full-Stack',
      level: 'Avançado',
      duration: '60 hours deep engineering',
      badgeColor: 'emerald',
      technologies: ['PostgreSQL 16', 'Redis 7', 'EXPLAIN ANALYZE', 'GiN / BRIN Indexes', 'Partitioning', 'Redlock', 'Cache-Aside', 'PgBouncer'],
      description: 'Learn to read PostgreSQL execution plans under pressure, partition billion-row tables, prevent cache stampedes, and configure PgBouncer pooling.',
      targetAudience: 'Backend engineers, DBAs, and architects safeguarding database reliability.',
      prerequisites: ['Intermediate SQL (SELECT, JOINs, GROUP BY).', 'Production DB integration experience.'],
      skillsLearned: [
        'Decode EXPLAIN (ANALYZE, BUFFERS) to wipe out sequential scans.',
        'Index JSONB workloads with GIN operators.',
        'Implement declarative Range Partitioning and retention drops.',
        'Prevent Thundering Herd stampedes with jittered TTLs and Redlock.'
      ],
      modules: [
        { title: 'Module 1: PostgreSQL Query Optimization', hours: '16h', topics: ['Shared Buffers, WAL & MVCC', 'EXPLAIN ANALYZE Buffers & Cost', 'Covering & Partial Indexes'] },
        { title: 'Module 2: Hybrid JSONB & Partitioning', hours: '15h', topics: ['GIN jsonb_path_ops', 'Range/List/Hash Partitioning', 'Autovacuum & Bloat Tuning'] },
        { title: 'Module 3: Defensive Redis Architecture', hours: '15h', topics: ['Cache-Aside vs Write-Through', 'Thundering Herd Mutex & Jitter', 'Eviction Policies (allkeys-lru)'] },
        { title: 'Module 4: HA, PgBouncer & LGPD Safety', hours: '14h', topics: ['PgBouncer Transaction Pooling', 'Streaming Failover with Patroni', 'WAL-G Backups & Masking'] }
      ],
      relatedArticleId: 'redis-caching-patterns',
      relatedPageId: 'database',
      relatedTab: 'relational'
    }
  ]
};

export default cloudCoursesEn;
