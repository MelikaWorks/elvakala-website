# ELVA KALA Documentation

This directory is reserved for repository-level technical documentation that applies across multiple ELVA KALA components or does not belong to one specific implementation directory.

## Suitable Content

- Architecture overviews
- Deployment and rollback procedures
- Website maintenance checklists
- Cross-component dependency notes
- Coding and repository conventions
- Technical decision records
- Environment descriptions without credentials
- Operational troubleshooting guides

## Documentation Placement

Documentation for one specific feature should normally remain beside that feature. For example:

- Elementor documentation belongs under `elementor/`.
- Performance investigations belong under `performance/`.
- Plugin-specific documentation belongs inside the related directory under `plugins/` or `Plugin-Customizations/`.
- SEO evidence belongs under `seo/`.

Use this directory only when a document has repository-wide value or spans several areas.

## Security

Do not include passwords, API keys, access tokens, private customer information, database exports, hosting credentials, or unredacted production configuration.
