export interface Product {
    id: number;
    name: string;
    alias: string;
    categoryId: number;
    thumbnailImage: string;
    unitPrice: number;
    originalPrice: number;
    promotionPrice: number;
    includedVAT: boolean;
    warranty: number;
    description: string;
    content: string;
    homeFlag: boolean;
    hotFlag: boolean;
    viewCount: number;
    dateCreated: string;
    createdBy: string;
    dateUpdated: string;
    updatedBy: string;
    metaKeyword: string;
    metaDescription: string;
    status: number;

    selected: boolean;
}