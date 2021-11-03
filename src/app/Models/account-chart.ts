
export interface AccountChart {
    id: string;
    nameAr: string;
    nameEn: string;
    number: string;
    fkTransactionTypeId: number;
    allowEntry: boolean;
    isActive: boolean;
    userId: number;
    creationDate: Date;
    status: boolean;
    parentId: string;
    parentNumber: string;
    chartLevelDepth: number;
    fkCostCenterTypeId: number;
    branchId: number;
    orgId: number;
    fkWorkFieldsId: string;
    noOfChilds?: any;
}



