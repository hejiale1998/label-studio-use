import type { TipsCollection } from "./types";

export const defaultTipsCollection: TipsCollection = {
  projectCreation: [
    {
      title: "你知道吗？",
      content: "It's easier to find the projects when you organize them into workspaces using Label Studio Enterprise.",
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
      content:
        "Streamline assigning staff to multiple projects by assigning them to workspaces in Label Studio Enterprise.",
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
      content:
        "In the Enterprise platform, admins can view annotator performance dashboards to optimize resource allocation, improve team management, and inform compensation.",
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
      content:
        "You can control access to specific projects and workspaces for internal team members and external annotators using Label Studio Enterprise.",
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
      content:
        "You can use or modify dozens or templates to configure your labeling UI, or create a custom configuration from scratch using simple XML-like tag.",
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
      content:
        "Label Studio has templates available for supervised LLM fine-tuning, RAG retrieval ranking, RLHF, chatbot evaluation, and more.",
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
      content:
        "Assign roles to your team using Label Studio Enterprise and control access to sensitive data at the project and workspace levels.",
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
      title: "Want to simplify and secure logging in?",
      content: "Enable Single Sign-On for your team using SAML, SCIM2 or LDAP with Label Studio Enterprise.",
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
      content: "Try Label Studio Starter Cloud, optimized for small teams and projects.",
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
      content:
        "Create rules, automate how tasks are distributed to annotators, and only show tasks assigned to each annotator in their view.and control task visibility for each annotator.",
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
      title: "Share knowledge with the community",
      content:
        "Have questions or a tip to share with other Label Studio users? Join the community slack channel for the latest updates. ",
      closable: true,
      link: {
        label: "Join the community",
        url: "https://label-studio.slack.com",
        params: {
          experiment: "organization_page_tip",
          treatment: "share_knowledge",
        },
      },
    },
    {
      title: "你知道吗？",
      content:
        "Label Studio supports multiple points of integration with cloud storage, machine learning models, and popular tools to automate your machine learning pipeline.",
      closable: true,
      link: {
        label: "Check out the integrations directory",
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
      content:
        "在企业平台中使用自动化功能，即时标注大规模数据集，同时保证质量。",
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
      content:
        "通过 Label Studio Enterprise 的审核流程和任务一致性评分，提高标注数据的质量。",
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
      content:
        "结合自动化与人工监督，在企业平台中评估并确保 LLM 质量。",
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
      content:
        "通过使用企业云服务，您可以节省管理基础设施和升级的时间，并获得更多自动化、质量和团队管理功能。",
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
      content: "Try Label Studio Starter Cloud, optimized for small teams and projects.",
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
      content: "You can connect ML models using the backend SDK to save time with pre-labeling or active learning.",
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
