/// <reference types="react-scripts" />
declare module '*.tsx'
declare module '*.ts'
declare module '*.svg'
declare module '*.png'
declare module "*.module.less" {
    const classes: { readonly [key: string]: string };
    export default classes;
}
declare module '*.css'