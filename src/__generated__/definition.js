// This is an auto-generated file, do not edit manually
export const definition = {
  models: {
    AccountTrustSignal: {
      interface: false,
      implements: [],
      id: "kjzl6hvfrbw6c8nzu392cql4klk69duesro78g7ebxdci66ssfdu7snwxz3xufj",
      accountRelation: { type: "set", fields: ["recipient"] },
    },
    AuditReview: {
      interface: false,
      implements: [],
      id: "kjzl6hvfrbw6c9lhk4858jqlfgkt68uqu6c4b1fsbct48q7pxkb6ogwh1qrj7s4",
      accountRelation: { type: "set", fields: ["auditId"] },
    },
    PeerTrustScore: {
      interface: false,
      implements: [],
      id: "kjzl6hvfrbw6cas30ptfet43wlnitl73t819zb0p1sjqei1hg63935cmgvwb27q",
      accountRelation: { type: "list" },
    },
    SecurityAudit: {
      interface: false,
      implements: [],
      id: "kjzl6hvfrbw6c9a5u6hxed1azc6snzau8exb9bvjbzsbxpm5wns30km6ga35kx0",
      accountRelation: { type: "set", fields: ["subjectId"] },
    },
    SoftwareTrustScore: {
      interface: false,
      implements: [],
      id: "kjzl6hvfrbw6c7iuwpcypubku7g7w87dz2wctvucvycig4bqeutfbjrebyvdpqd",
      accountRelation: { type: "list" },
    },
  },
  objects: {
    AccountTrustSignal: {
      proof: { type: "string", required: true, immutable: false },
      recipient: {
        type: "did",
        required: true,
        immutable: true,
        indexed: true,
      },
      issuanceDate: {
        type: "datetime",
        required: true,
        immutable: false,
        indexed: true,
      },
      trustWorthiness: {
        type: "list",
        required: true,
        immutable: false,
        item: {
          type: "reference",
          refType: "object",
          refName: "AccountTrustTypes",
          required: true,
          immutable: false,
        },
      },
      issuer: { type: "view", viewType: "documentAccount" },
    },
    AccountTrustTypes: {
      type: { type: "string", required: true, immutable: false },
      level: { type: "string", required: true, immutable: false },
      scope: { type: "string", required: true, immutable: false },
      reason: {
        type: "list",
        required: false,
        immutable: false,
        item: { type: "string", required: false, immutable: false },
      },
    },
    AuditReview: {
      proof: { type: "string", required: true, immutable: true },
      reason: {
        type: "list",
        required: true,
        immutable: false,
        item: { type: "string", required: true, immutable: false },
      },
      auditId: {
        type: "streamid",
        required: true,
        immutable: true,
        indexed: true,
      },
      issuanceDate: { type: "datetime", required: true, immutable: false },
      endorsedStatus: {
        type: "boolean",
        required: true,
        immutable: false,
        indexed: true,
      },
      audit: {
        type: "view",
        viewType: "relation",
        relation: {
          source: "document",
          model:
            "kjzl6hvfrbw6c9a5u6hxed1azc6snzau8exb9bvjbzsbxpm5wns30km6ga35kx0",
          property: "auditId",
        },
      },
      issuer: { type: "view", viewType: "documentAccount" },
    },
    Findings: {
      lang: { type: "string", required: true, immutable: false },
      type: { type: "string", required: true, immutable: false },
      criticality: { type: "float", required: true, immutable: false },
      description: { type: "string", required: false, immutable: false },
    },
    PeerTrustScore: {
      proof: { type: "string", required: true, immutable: false },
      recipient: {
        type: "did",
        required: true,
        immutable: false,
        indexed: true,
      },
      trustScore: {
        type: "reference",
        refType: "object",
        refName: "TrustScore",
        required: true,
        immutable: false,
      },
      issuanceDate: {
        type: "datetime",
        required: true,
        immutable: false,
        indexed: true,
      },
      trustScoreType: {
        type: "string",
        required: true,
        immutable: false,
        indexed: true,
      },
      issuer: { type: "view", viewType: "documentAccount" },
    },
    SecurityAudit: {
      proof: { type: "string", required: true, immutable: true },
      subjectId: {
        type: "string",
        required: true,
        immutable: true,
        indexed: true,
      },
      issuanceDate: {
        type: "datetime",
        required: true,
        immutable: false,
        indexed: true,
      },
      securityStatus: {
        type: "boolean",
        required: true,
        immutable: false,
        indexed: true,
      },
      securityFindings: {
        type: "list",
        required: true,
        immutable: false,
        item: {
          type: "reference",
          refType: "object",
          refName: "Findings",
          required: true,
          immutable: false,
        },
      },
      issuer: { type: "view", viewType: "documentAccount" },
      reviews: {
        type: "view",
        viewType: "relation",
        relation: {
          source: "queryConnection",
          model:
            "kjzl6hvfrbw6c9lhk4858jqlfgkt68uqu6c4b1fsbct48q7pxkb6ogwh1qrj7s4",
          property: "auditId",
        },
      },
    },
    SoftwareTrustScore: {
      proof: { type: "string", required: true, immutable: false },
      subjectId: {
        type: "string",
        required: true,
        immutable: false,
        indexed: true,
      },
      trustScore: {
        type: "reference",
        refType: "object",
        refName: "TrustScore",
        required: true,
        immutable: false,
      },
      issuanceDate: {
        type: "datetime",
        required: true,
        immutable: false,
        indexed: true,
      },
      trustScoreType: {
        type: "string",
        required: true,
        immutable: false,
        indexed: true,
      },
      issuer: { type: "view", viewType: "documentAccount" },
    },
    TrustScore: {
      value: { type: "float", required: true, immutable: false },
      confidence: { type: "float", required: true, immutable: false },
    },
  },
  enums: {},
  accountData: {
    accountTrustSignal: { type: "set", name: "AccountTrustSignal" },
    accountTrustSignalList: { type: "connection", name: "AccountTrustSignal" },
    auditReview: { type: "set", name: "AuditReview" },
    auditReviewList: { type: "connection", name: "AuditReview" },
    peerTrustScoreList: { type: "connection", name: "PeerTrustScore" },
    recipientOfAccountTrustSignal: {
      type: "account-set",
      name: "AccountTrustSignal",
      property: "recipient",
    },
    recipientOfAccountTrustSignalList: {
      type: "account",
      name: "AccountTrustSignal",
      property: "recipient",
    },
    recipientOfPeerTrustScoreList: {
      type: "account",
      name: "PeerTrustScore",
      property: "recipient",
    },
    securityAudit: { type: "set", name: "SecurityAudit" },
    securityAuditList: { type: "connection", name: "SecurityAudit" },
    softwareTrustScoreList: { type: "connection", name: "SoftwareTrustScore" },
  },
};
