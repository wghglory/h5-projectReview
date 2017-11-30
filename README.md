# H5 ProjectReview Angular

## use scss

```bash
ng new My_New_Project --style=scss
```

### 已有 angular-cli 工程改为 sass

```bash
npm install node-sass --save-dev
```

修改已有项目的 .angular-cli.json 配置文件：

修改最后的 defaults 标签:

```diff
"defaults": {
-  "styleExt": "css",
+  "styleExt": "scss",
}
```

然后修改styles标签:

```diff
"styles": [
- "styles.css"
+ "styles.scss"
]
```

并把全局 style.css 文件改为 style.scss

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.2.

## Thought

Angular Module：

app module --> login component
project module --> home + project
review module --> review component

### todo in future

Add nav in home component. Maybe home just shows introduction and navlinks. If that happens, login + home should be in app module. And project List and individual project are in project module.

## Issue solving

1. Can't bind to 'ngModel' since it isn't a known property of 'input'

```typescript
import { FormsModule } from '@angular/forms';

[...]

@NgModule({
  imports: [
    [...]
    FormsModule
  ],
  [...]
})
```

---

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
