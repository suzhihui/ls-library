/**
 * 生成模板代码（简化实现）
 * @param ast 解析后的 AST
 * @returns 生成的模板代码字符串
 */
function generateTemplateCode(ast: ReturnType<typeof parse>): string {
  let output = ''
  
  /**
   * 处理单个节点
   * @param node 当前处理的模板节点
   */
  const processNode = (node: TemplateChildNode) => {
    if (node.type === 1) { // 元素节点
      const elementNode = node as ElementNode
      
      // 拼接开始标签
      output += `<${elementNode.tag}`
      
      // 处理所有指令
      elementNode.props.forEach(prop => {
        if (prop.type === 7) { // 指令节点
          const directive = prop as DirectiveNode
          const exp = directive.exp as import('@vue/compiler-dom').SimpleExpressionNode
          output += ` v-${directive.name}="${(directive.exp as { content?: string })?.content}"`
        }
      })
      
      output += '>'
      
      // 递归处理子节点
      elementNode.children.forEach(processNode)
      
      // 拼接结束标签
      output += `</${elementNode.tag}>`
    }
  }

  // 遍历所有根节点
  ast.children.forEach(processNode)
  
  return `<template>${output}</template>`
}

// 扩展 Vite 类型声明
declare module 'vite' {
  export interface PluginContext {
    /**
     * 输出警告信息
     * @param msg 警告内容
     */
    warn(msg: string): void
  }
}


// component-enhance-hook
import type { PluginOption } from "vite";
import { parse } from '@vue/compiler-dom'
import type {
  TemplateChildNode,
  ElementNode,
  DirectiveNode
} from '@vue/compiler-dom'

// 可以自定义hook绑定的前缀、绑定的属性值合集对应的键和事件合集对应的键
type HookBindPluginOptions = {
  prefix?: string;
  bindKey?: string;
  eventKey?: string;
  inheritAttrs?: boolean;
};
export default function hookBind(options?: HookBindPluginOptions): PluginOption {
  const { prefix, bindKey, eventKey, inheritAttrs } = Object.assign(
    {
      prefix: "v-ehb",
      bindKey: "bindProps",
      eventKey: "bindEvents",
      inheritAttrs: false
    },
    options
  );

  return {
    name: "vite-plugin-vue-component-enhance-hook-bind",
    enforce: "pre",
    transform: (code: string, id: string) => {
      const last = id.substring(id.length - 4);

      if (last === ".vue") {
        // 处理之前先判断一下
        if (code.indexOf(prefix) === -1) {
          return code;
        }
        // 获取 template 开头
        const templateStrStart = code.indexOf("<template>");
        // 获取 template 结尾
        const templateStrEnd = code.lastIndexOf("</template>");

        let templateStr = code.substring(templateStrStart, templateStrEnd + 11);

        let startIndex;
        // 循环转换 template 中的hook绑定指令
        while ((startIndex = templateStr.indexOf(prefix)) > -1) {
          const endIndex = templateStr.indexOf(`"`, startIndex + 7);
          const str = templateStr.substring(startIndex, endIndex + 1);
          const obj = str.split(`"`)[1];
          const newStr = templateStr.replace(
            str,
            `v-bind="${obj}.${bindKey}" v-on="${obj}.${eventKey}"`
          );
          
        //   console.log(obj, 99999, newStr);
          templateStr = newStr;
        }

        // 拼接并返回
        return (
          code.substring(0, templateStrStart) +
          templateStr +
          code.substring(templateStrEnd + 11)
        );
      }

      return code;
    },
  };
}