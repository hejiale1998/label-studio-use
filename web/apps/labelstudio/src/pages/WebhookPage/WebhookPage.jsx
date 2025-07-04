import { useCallback, useEffect, useMemo, useState } from "react";

import { useAPI } from "../../providers/ApiProvider";
import "./WebhookPage.scss";

import WebhookList from "./WebhookList";
import WebhookDetail from "./WebhookDetail";
import { useProject } from "../../providers/ProjectProvider";
import { Block, Elem } from "../../utils/bem";
import { IconInfo } from "@humansignal/icons";
import { useHistory } from "react-router";

const Webhook = () => {
  const [activeWebhook, setActiveWebhook] = useState(null);
  const [webhooks, setWebhooks] = useState(null);
  const [webhooksInfo, setWebhooksInfo] = useState(null);

  const history = useHistory();

  const api = useAPI();
  const { project } = useProject();

  const projectId = useMemo(() => {
    if (history.location.pathname.startsWith("/projects")) {
      if (Object.keys(project).length === 0) {
        return null;
      }
      return project.id;
    }
    return undefined;
  }, [project, history]);

  const fetchWebhooks = useCallback(async () => {
    if (projectId === null) {
      setWebhooks(null);
      return;
    }
    const params = {};

    if (projectId !== undefined) {
      params.project = projectId;
    } else {
      params.project = null;
    }
    const webhooks = await api.callApi("webhooks", {
      params,
    });

    if (webhooks) setWebhooks(webhooks);
  }, [projectId]);

  const fetchWebhooksInfo = useCallback(async () => {
    if (projectId === null) {
      setWebhooksInfo(null);
      return;
    }
    const params = {};

    if (projectId !== undefined) {
      params["organization-only"] = false;
    }

    const info = await api.callApi("webhooksInfo", {
      params,
    });

    if (info) setWebhooksInfo(info);
  }, [projectId]);

  useEffect(() => {
    fetchWebhooks();
    fetchWebhooksInfo();
  }, [project, projectId]);

  if (webhooks === null || webhooksInfo === null || projectId === null) {
    return null;
  }
  let content = null;

  if (activeWebhook === "new") {
    content = (
      <WebhookDetail
        onSelectActive={setActiveWebhook}
        onBack={() => setActiveWebhook(null)}
        webhook={null}
        fetchWebhooks={fetchWebhooks}
        webhooksInfo={webhooksInfo}
      />
    );
  } else if (activeWebhook === null) {
    content = (
      <WebhookList
        onSelectActive={setActiveWebhook}
        onAddWebhook={() => {
          setActiveWebhook("new");
        }}
        fetchWebhooks={fetchWebhooks}
        webhooks={webhooks}
      />
    );
  } else {
    content = (
      <WebhookDetail
        onSelectActive={setActiveWebhook}
        onBack={() => setActiveWebhook(null)}
        webhook={webhooks[webhooks.findIndex((x) => x.id === activeWebhook)]}
        fetchWebhooks={fetchWebhooks}
        webhooksInfo={webhooksInfo}
      />
    );
  }
  return (
    <Block name="webhook-wrap">
      {content}
      <Elem name="footer">
        <Elem name="footer-icon">
          <IconInfo width="28" height="28" />
        </Elem>
        <Elem name="footer-text">
          <p>
            Webhook（网络钩子）允许外部服务在特定事件发生时收到通知。当指定事件发生时，系统会向你提供的每个 URL 发送 POST 请求。
          </p>
          <p>
            <a href="https://labelstud.io/guide/webhooks.html" target="_blank" rel="noreferrer">
              查看文档了解更多
            </a>
            。
          </p>
        </Elem>
      </Elem>
    </Block>
  );
};

export const WebhookPage = {
  title: "Webhook 设置",
  path: "/webhooks",
  component: Webhook,
};
