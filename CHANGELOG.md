# Changelog

## [0.4.1](https://github.com/JorisJonkers-dev/home-portal/compare/v0.4.0...v0.4.1) (2026-08-27)


### Bug Fixes

* **auth:** stop dropping the CSRF header on every mutating request ([#32](https://github.com/JorisJonkers-dev/home-portal/issues/32)) ([f63dad8](https://github.com/JorisJonkers-dev/home-portal/commit/f63dad8570e65076932a64e5a44f1301e4620e2b))

## [0.4.0](https://github.com/JorisJonkers-dev/home-portal/compare/v0.3.2...v0.4.0) (2026-08-26)


### Features

* **apps:** surface Outline in the MyApps grid ([#31](https://github.com/JorisJonkers-dev/home-portal/issues/31)) ([7fb9afb](https://github.com/JorisJonkers-dev/home-portal/commit/7fb9afb5ba5e419d1c77fcd1728680d75a8df314))


### Bug Fixes

* **platform:** make render-local.sh able to run ([#18](https://github.com/JorisJonkers-dev/home-portal/issues/18)) ([af81c7b](https://github.com/JorisJonkers-dev/home-portal/commit/af81c7baccd6e786a1d2c23476de588a16a7bf58))
* **platform:** name the live objects so a render adopts app-ui ([#30](https://github.com/JorisJonkers-dev/home-portal/issues/30)) ([30b4501](https://github.com/JorisJonkers-dev/home-portal/commit/30b45016d6ab44b0de5dd0cfa8207b147cc69671))

## [0.3.2](https://github.com/JorisJonkers-dev/home-portal/compare/v0.3.1...v0.3.2) (2026-08-19)


### Bug Fixes

* **ci:** bump the reusable workflow pins so job timeouts apply ([#16](https://github.com/JorisJonkers-dev/home-portal/issues/16)) ([a469bfe](https://github.com/JorisJonkers-dev/home-portal/commit/a469bfe95588407b4dc5eede311dad68bb86b6ec))
* **ci:** restore the arm64 image build ([#11](https://github.com/JorisJonkers-dev/home-portal/issues/11)) ([0d5c0ca](https://github.com/JorisJonkers-dev/home-portal/commit/0d5c0caaf1a3e19fafd5faafbbdc0c118e416606))
* **ci:** stop gating release-please's generated files on Prettier ([#13](https://github.com/JorisJonkers-dev/home-portal/issues/13)) ([88badc4](https://github.com/JorisJonkers-dev/home-portal/commit/88badc4f31fdcadaa8489c94f058493721350b89))

## [0.3.1](https://github.com/JorisJonkers-dev/home-portal/compare/v0.3.0...v0.3.1) (2026-07-10)

### Bug Fixes

- **platform:** correct public context-ref digest to match cluster ([#8](https://github.com/JorisJonkers-dev/home-portal/issues/8)) ([f7f6301](https://github.com/JorisJonkers-dev/home-portal/commit/f7f630176a04a6468f275207cdcebeef389a648e))

## [0.3.0](https://github.com/JorisJonkers-dev/home-portal/compare/v0.2.0...v0.3.0) (2026-07-10)

### Features

- **platform:** adopt deploy platform v1.3.1 ([fd57a3d](https://github.com/JorisJonkers-dev/home-portal/commit/fd57a3dd0379974f8441e23d2acf7a4994305653))

## [0.2.0](https://github.com/JorisJonkers-dev/home-portal/compare/v0.1.0...v0.2.0) (2026-06-29)

### Features

- adopt @extratoast/vue-web-commons in the UIs ([5a7bf22](https://github.com/JorisJonkers-dev/home-portal/commit/5a7bf22b000b8c82fd54ab427a281109ceede58d))
- **app-ui:** add agents-login card to MyApps ([#701](https://github.com/JorisJonkers-dev/home-portal/issues/701)) ([1841fd7](https://github.com/JorisJonkers-dev/home-portal/commit/1841fd7d11dd7258ac1e4630eae32fce7dc7c0a9))
- **app-ui:** swap MyApps Status tile icon to gatus.svg ([#185](https://github.com/JorisJonkers-dev/home-portal/issues/185)) ([e340ae4](https://github.com/JorisJonkers-dev/home-portal/commit/e340ae4687359e3a4473b88ec9e54680bd50bd98))
- cut over to ExtraToast/agents published images ([#657](https://github.com/JorisJonkers-dev/home-portal/issues/657)) ([5aba60d](https://github.com/JorisJonkers-dev/home-portal/commit/5aba60d089530741f36ff3ef98db24ffee8e78a6))
- fix OAuth2 session auth, enforce 2FA, expand testing ([#40](https://github.com/JorisJonkers-dev/home-portal/issues/40)) ([674f270](https://github.com/JorisJonkers-dev/home-portal/commit/674f270e496a738f161527c214c76184663e9446))
- RBAC for services, admin API, and app-ui dashboard ([#35](https://github.com/JorisJonkers-dev/home-portal/issues/35)) ([e885969](https://github.com/JorisJonkers-dev/home-portal/commit/e8859698504de56a31b602a70d40e32591b51136))

### Bug Fixes

- **app-ui:** device safe-area for native app top nav ([#698](https://github.com/JorisJonkers-dev/home-portal/issues/698)) ([dbf6e26](https://github.com/JorisJonkers-dev/home-portal/commit/dbf6e26bf0b3aba5d29e6131083953ccf3887937))
- **app-ui:** repair account page + add My Apps nav + polish admin ([#170](https://github.com/JorisJonkers-dev/home-portal/issues/170)) ([d6c1d4d](https://github.com/JorisJonkers-dev/home-portal/commit/d6c1d4d310f855144b25772f342a91e5ecd99470))
- migrate home portal to JorisJonkers-dev ([#1](https://github.com/JorisJonkers-dev/home-portal/issues/1)) ([b7ce848](https://github.com/JorisJonkers-dev/home-portal/commit/b7ce8480845586100e7b74a2755f5e14fea2f29b))
- **ui:** mobile-safe sign-in centering + viewport-fit ([#697](https://github.com/JorisJonkers-dev/home-portal/issues/697)) ([ce71d38](https://github.com/JorisJonkers-dev/home-portal/commit/ce71d38fdc534d11b28c43e71c67d4068a0b2583))

### Performance Improvements

- **ui:** nginx cache headers for index.html + consistent image caching ([#165](https://github.com/JorisJonkers-dev/home-portal/issues/165)) ([beb19f7](https://github.com/JorisJonkers-dev/home-portal/commit/beb19f7082efdb548fd4b2a007ee5cb732675f28))

### Reverts

- **app-ui:** drop mobile safe-area CSS override ([#699](https://github.com/JorisJonkers-dev/home-portal/issues/699)) ([2566a6a](https://github.com/JorisJonkers-dev/home-portal/commit/2566a6aa7c1d617a3864aefca896432187182952))
