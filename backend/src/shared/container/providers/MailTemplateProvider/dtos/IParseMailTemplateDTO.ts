interface ITemplateVariables {
  [key: string]: string | number;
}

export default class IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
