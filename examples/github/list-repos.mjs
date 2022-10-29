#!/usr/bin/env zx

const res = await $`gh api /users/pomdtr/repos --paginate --cache 3600s`;
const repos = JSON.parse(res);

const items = repos.map((repo) => ({
  title: repo.name,
  subtitle: repo.owner.login,
  accessories: [`${repo.stargazers_count} ⭐`],
  actions: [
    {
      type: "open-url",
      title: "Open in Browser",
      shortcut: "enter",
      url: repo.html_url,
    },
    {
      type: "launch",
      title: "List Pull Requests",
      target: "list-prs",
      shortcut: "ctrl+p",
      params: {
        repository: repo.full_name,
      },
    },
  ],
}));

for (const item of items) {
  console.log(JSON.stringify(item));
}
