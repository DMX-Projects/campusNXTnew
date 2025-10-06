import React from 'react';
import { cn } from '../../../utils/helpers';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'gray';
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const colorClasses = {
  primary: 'text-blue-600',
  secondary: 'text-gray-600',
  white: 'text-white',
  gray: 'text-gray-400',
};

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'primary',
  className,
  text,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className="relative">
        <div
          className={cn(
            'animate-spin rounded-full border-2 border-gray-200',
            sizeClasses[size],
            colorClasses[color]
          )}
          style={{
            borderTopColor: 'currentColor',
          }}
        />
      </div>
      {text && (
        <p className={cn('mt-2 text-sm', colorClasses[color])}>
          {text}
        </p>
      )}
    </div>
  );
};

// Spinner component for inline use
export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'sm',
  className,
}) => {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-gray-200 border-t-blue-600',
        sizeClasses[size],
        className
      )}
    />
  );
};

// Full page loader
export const FullPageLoader: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <div className="text-center">
        <Loader size="xl" text={text} />
      </div>
    </div>
  );
};

// Overlay loader
export const OverlayLoader: React.FC<{ text?: string; show: boolean }> = ({ 
  text = 'Loading...', 
  show 
}) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
      <Loader size="lg" text={text} />
    </div>
  );
};

// Skeleton loader
export const Skeleton: React.FC<{ 
  className?: string; 
  lines?: number; 
  width?: string | number;
  height?: string | number;
}> = ({ 
  className, 
  lines = 1, 
  width = '100%', 
  height = '1rem' 
}) => {
  if (lines === 1) {
    return (
      <div
        className={cn(
          'animate-pulse bg-gray-200 rounded',
          className
        )}
        style={{ width, height }}
      />
    );
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'animate-pulse bg-gray-200 rounded',
            index === lines - 1 ? 'w-3/4' : 'w-full',
            className
          )}
          style={{ height }}
        />
      ))}
    </div>
  );
};

// Table skeleton loader
export const TableSkeleton: React.FC<{ 
  rows?: number; 
  columns?: number; 
  className?: string;
}> = ({ 
  rows = 5, 
  columns = 4, 
  className 
}) => {
  return (
    <div className={cn('space-y-3', className)}>
      {/* Header skeleton */}
      <div className="flex space-x-4">
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} width="25%" height="2rem" />
        ))}
      </div>
      
      {/* Rows skeleton */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} width="25%" height="1.5rem" />
          ))}
        </div>
      ))}
    </div>
  );
};

// Card skeleton loader
export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('p-6 border rounded-lg', className)}>
      <Skeleton width="60%" height="1.5rem" className="mb-4" />
      <Skeleton lines={3} className="mb-4" />
      <div className="flex justify-between items-center">
        <Skeleton width="30%" height="1rem" />
        <Skeleton width="20%" height="2rem" />
      </div>
    </div>
  );
};

export default Loader;

