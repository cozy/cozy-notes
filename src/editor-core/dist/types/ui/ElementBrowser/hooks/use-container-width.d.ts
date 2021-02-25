import React from 'react';
/**
 *
 * Problem:
 * While using WidthObserver, there's no initial width.
 * That may cause problems, but not limited to, something like a lag between
 * renders for conditionally rendered components.
 *
 * solution:
 * useContainerWidth() hook
 * it pre-measures the width of a parent container on initial mount
 * and gives you back the containerWidth.
 *
 *
 * Example hook usage:
 *
 *  const { containerWidth, ContainerWidthMonitor } = useContainerWidth();
 *
 *  return (
 *   <>
 *    <ContainerWidthMonitor />
 *    {containerWidth < 600 ? <MobileComponent /> : <DesktopComponent />}
 *   </>
 *  );
 *
 */
declare type useContainerWidthReturnType = {
    containerWidth: number;
    ContainerWidthMonitor: React.ElementType;
};
export default function useContainerWidth(): useContainerWidthReturnType;
export {};
