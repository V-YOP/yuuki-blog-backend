import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from 'mdx-bundler/client'
const COMPONENT_PREFIX = 'COMPONENT/'

/**
 * bundle mdx with dependent components and library
 * @param mdx mdx content
 * @param components component name -> content
 * @param dependencyWhiteList valid dependency list
 * @returns 
 */
export async function bundleMdx(mdx: string, components: Record<string, string>, dependencyWhiteList: (RegExp | string)[]) {
  const imports = [
    ...mdx.matchAll(/import\s+(.*?\s+from)?\s*('(.*?)'|"(.*?)")/g),
    ...mdx.matchAll(/require\s*\((\s*('(.*?)'|"(.*?)")\s*)\)/g)].map(match => ({
      name: match[3],
      index: match.index!
    }))

  imports.forEach(({ name, index }) => {
    if (name.startsWith(COMPONENT_PREFIX)) {
      if (!components[name]) {
        throw new Error(`dependent component ${name} is missing! row: ${[...mdx.substring(0, index + 1)].filter(c => c === '\n').length + 1}`)
      }
      return;
    }
    if (!dependencyWhiteList.find(match => (match instanceof RegExp && name.match(match)) || match === name)) {
      throw new Error(`dependency ${name} is invalid! row: ${[...mdx.substring(0, index + 1)].filter(c => c === '\n').length + 1}`)
    }
  })
  // TODO 待处理异常，使该函数无副作用
  return bundleMDX({ source: mdx, files: components })
}