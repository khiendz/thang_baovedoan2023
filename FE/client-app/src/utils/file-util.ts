export const JoinFileCDN = (fileName:string) => {

    const resultName = `${process?.env?.DOMAIN_BACK_END}/static/images/${fileName}`;
    return resultName;
}