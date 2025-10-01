'use client';

// TradingViewWidget.jsx
import React, { useRef, memo } from 'react';
import useTradingViewWidget from '@/hooks/useTradingViewWidget';
import { cn } from '../lib/utils';

interface TradingViewWidgetProps {
  title?: string
  height?: number;
  className?: string;
  scriptUrl: string;
  config: Record<string, unknown>;
}

function TradingViewWidget({ title, height = 600, className, scriptUrl, config }: TradingViewWidgetProps) {
  const containerRef = useTradingViewWidget(scriptUrl, config, height);

  
  return (
    <div className="w-full">
      {title && <h3 className="text-2xl font-semibold text-gray-100 mb-5">{title}</h3>}
      <div className={cn('tradingview-widget-container', className)} ref={containerRef}>
      <div className="tradingview-widget-container__widget" style={{ height, width: "100%" }}></div>
    </div>
    </div>
  );
}

export default memo(TradingViewWidget);
