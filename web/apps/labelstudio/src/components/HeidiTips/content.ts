import type { TipsCollection } from "./types";

export const defaultTipsCollection: TipsCollection = {
  projectCreation: [
    {
      title: "你知道吗？",
      content: "通过在 Label Studio 企业版中将项目组织到工作区，更容易查找和管理项目。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/manage_projects#Create-workspaces-to-organize-projects",
        params: {
          experiment: "project_creation_tip",
          treatment: "find_and_manage_projects",
        },
      },
    },
    {
      title: "解锁更快访问配置",
      content: "通过在 Label Studio 企业版中将成员分配到工作区，可更高效地为多个项目分配人员。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/manage_projects#Add-or-remove-members-to-a-workspace",
        params: {
          experiment: "project_creation_tip",
          treatment: "faster_provisioning",
        },
      },
    },
    {
      title: "你知道吗？",
      content: "在企业平台中，管理员可查看标注员绩效仪表盘，优化资源分配、提升团队管理并辅助薪酬决策。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/dashboard_annotator",
        params: {
          experiment: "project_creation_tip",
          treatment: "annotator_dashboard",
        },
      },
    },
    {
      title: "你知道吗？",
      content: "在 Label Studio 企业版中，您可以为内部团队成员和外部标注员分配项目和工作区的访问权限。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/manage_users#Roles-in-Label-Studio-Enterprise",
        params: {
          experiment: "project_creation_tip",
          treatment: "access_to_projects",
        },
      },
    },
    {
      title: "你知道吗？",
      content: "您可以使用或修改数十种模板来配置标注界面，或通过简单的类 XML 标签从零自定义配置。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://labelstud.io/guide/setup",
        params: {
          experiment: "project_creation_tip",
          treatment: "templates",
        },
      },
    },
    {
      title: "Labeling for GenAI",
      content: "Label Studio 提供了用于监督式 LLM 微调、RAG 检索排序、RLHF、聊天机器人评测等的模板。",
      closable: true,
      link: {
        label: "Explore templates",
        url: "https://labelstud.io/templates/gallery_generative_ai",
        params: {
          experiment: "project_creation_tip",
          treatment: "genai_templates",
        },
      },
    },
  ],
  organizationPage: [
    {
      title: "It looks like your team is growing!",
      content: "在 Label Studio 企业版中为团队成员分配角色，并在项目和工作区级别控制敏感数据的访问权限。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/manage_users#Roles-in-Label-Studio-Enterprise",
        params: {
          experiment: "organization_page_tip",
          treatment: "team_growing",
        },
      },
    },
    {
      title: "想要简化和安全登录吗？",
      content: "在 Label Studio 企业版中，使用 SAML、SCIM2 或 LDAP 启用团队单点登录（SSO）。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/auth_setup",
        params: {
          experiment: "organization_page_tip",
          treatment: "enable_sso",
        },
      },
    },
    {
      title: "你知道吗？",
      content: "试试 Label Studio Starter Cloud，为小团队和小型项目量身优化。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://humansignal.com/pricing/",
        params: {
          experiment: "organization_page_tip",
          treatment: "starter_cloud_live",
        },
      },
    },
    {
      title: "Want to automate task distribution?",
      content: "创建规则，自动分配任务给标注员，并仅在各自视图中显示分配给他们的任务，实现任务可见性控制。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/setup_project#Set-up-annotation-settings-for-your-project",
        params: {
          experiment: "organization_page_tip",
          treatment: "automate_distribution",
        },
      },
    },
    {
      title: "与社区分享知识",
      content: "Label Studio 支持与云存储、机器学习模型及主流工具的多点集成，助力自动化您的机器学习流程。",
      closable: true,
      link: {
        label: "加入社区",
        url: "https://label-studio.slack.com",
        params: {
          experiment: "organization_page_tip",
          treatment: "share_knowledge",
        },
      },
    },
    {
      title: "你知道吗？",
      content: "通过在 Label Studio 企业版中使用自动化功能，即时标注大规模数据集，同时保证质量。",
      closable: true,
      link: {
        label: "查看集成目录",
        url: "https://labelstud.io/integrations/",
        params: {
          experiment: "organization_page_tip",
          treatment: "integration_points",
        },
      },
    },
  ],
  projectSettings: [
    {
      title: "自动标注节省时间",
      content: "通过在企业平台中使用自动化功能，即时标注大规模数据集，同时保证质量。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/prompts_overview#Auto-labeling-with-Prompts",
        params: {
          experiment: "project_settings_tip",
          treatment: "auto_labeling",
        },
      },
    },
    {
      title: "你知道吗？",
      content: "通过 Label Studio Enterprise 的审核流程和任务一致性评分，提高标注数据的质量。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/quality",
        params: {
          experiment: "project_settings_tip",
          treatment: "quality_and_agreement",
        },
      },
    },
    {
      title: "评估 GenAI 模型",
      content: "结合自动化与人工监督，在企业平台中评估并确保 LLM 质量。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://humansignal.com/evals/",
        params: {
          experiment: "project_settings_tip",
          treatment: "evals",
        },
      },
    },
    {
      title: "你知道吗？",
      content: "通过使用企业云服务，您可以节省管理基础设施和升级的时间，并获得更多自动化、质量和团队管理功能。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://humansignal.com/platform/",
        params: {
          experiment: "project_settings_tip",
          treatment: "infrastructure_and_upgrades",
        },
      },
    },
    {
      title: "你知道吗？",
      content: "试试 Label Studio Starter Cloud，为小团队和小型项目量身优化。",
      link: {
        label: "了解更多",
        url: "https://humansignal.com/pricing/",
        params: {
          experiment: "project_settings_tip",
          treatment: "starter_cloud_live",
        },
      },
    },
    {
      title: "你知道吗？",
      content: "通过后端 SDK 连接机器学习模型，实现预标注或主动学习，节省时间。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://labelstud.io/guide/ml",
        params: {
          experiment: "project_settings_tip",
          treatment: "connect_ml_models",
        },
      },
    },
  ],
};
