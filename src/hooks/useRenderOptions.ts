import { useMemo } from "react";

export interface RenderOptions {
    showGrid: boolean;
    showVectors: boolean;
    showFieldLines: boolean;
    showEquipotentialLines: boolean;
    fieldLineDensity: number;
    equipotentialLineCount: number;
    fieldStrengthScale: number;
    highQuality: boolean;
}

export const useRenderOptions = (options: Partial<RenderOptions> = {}) => {
    const defaultOptions: RenderOptions = {
        showGrid: true,
        showVectors: true,
        showFieldLines: true,
        showEquipotentialLines: true,
        fieldLineDensity: 5,
        equipotentialLineCount: 10,
        fieldStrengthScale: 5,
        highQuality: true,
        ...options
    };

    return useMemo(() => defaultOptions, []);
}