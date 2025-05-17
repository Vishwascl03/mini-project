import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useCanvasStore } from '../../store/canvasStore';
import { 
  Palette, 
  Eraser, 
  Save, 
  Trash2, 
  Download, 
  Share2, 
  ChevronDown,
  Sparkles,
  Menu
} from 'lucide-react';
import { useSuggestionsStore } from '../../store/suggestionsStore';

const CanvasToolbar: React.FC = () => {
  const { 
    currentColor, 
    currentWidth, 
    setCurrentColor, 
    setCurrentWidth,
    clearCanvas 
  } = useCanvasStore();
  
  const { generateSuggestion } = useSuggestionsStore();
  
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBrushSizes, setShowBrushSizes] = useState(false);
  const [promptInput, setPromptInput] = useState('');
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const brushSizes = [2, 5, 10, 15, 20];
  
  const handleColorClick = () => {
    setShowColorPicker(!showColorPicker);
    setShowBrushSizes(false);
    setShowMobileMenu(false);
  };
  
  const handleBrushClick = () => {
    setShowBrushSizes(!showBrushSizes);
    setShowColorPicker(false);
    setShowMobileMenu(false);
  };
  
  const handleEraserClick = () => {
    setCurrentColor('#ffffff');
    setShowMobileMenu(false);
  };
  
  const handleClearCanvas = () => {
    if (window.confirm('Are you sure you want to clear the canvas?')) {
      clearCanvas();
    }
    setShowMobileMenu(false);
  };
  
  const handleSaveClick = () => {
    alert('Canvas saved successfully!');
    setShowMobileMenu(false);
  };
  
  const handleDownloadClick = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'artwork.png';
    link.href = dataUrl;
    link.click();
    setShowMobileMenu(false);
  };
  
  const handleShareClick = () => {
    alert('Shareable link copied to clipboard!');
    setShowMobileMenu(false);
  };
  
  const handleAIPrompt = () => {
    if (promptInput.trim()) {
      generateSuggestion(promptInput);
      setPromptInput('');
      setShowPromptInput(false);
      setShowMobileMenu(false);
    }
  };
  
  const toolbarContent = (
    <>
      <div className="flex space-x-2">
        <div className="relative">
          <button
            onClick={handleColorClick}
            className="btn btn-outline p-2 flex items-center"
            title="Color"
          >
            <Palette className="h-5 w-5" />
            <div 
              className="ml-2 w-4 h-4 rounded-full border border-gray-300" 
              style={{ backgroundColor: currentColor }}
            />
            <ChevronDown className="ml-1 h-3 w-3" />
          </button>
          
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-2 z-20 bg-white rounded-md shadow-lg p-3 border border-gray-200">
              <HexColorPicker color={currentColor} onChange={setCurrentColor} />
            </div>
          )}
        </div>
        
        <div className="relative">
          <button
            onClick={handleBrushClick}
            className="btn btn-outline p-2 flex items-center"
            title="Brush Size"
          >
            <span className="font-medium">Size</span>
            <span className="ml-2">{currentWidth}px</span>
            <ChevronDown className="ml-1 h-3 w-3" />
          </button>
          
          {showBrushSizes && (
            <div className="absolute top-full left-0 mt-2 z-20 bg-white rounded-md shadow-lg p-2 border border-gray-200">
              <div className="flex flex-col space-y-2">
                {brushSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => {
                      setCurrentWidth(size);
                      setShowBrushSizes(false);
                    }}
                    className={`flex items-center px-3 py-1 rounded-md ${
                      currentWidth === size ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div 
                        className="rounded-full bg-black" 
                        style={{ 
                          width: `${Math.min(size, 20)}px`, 
                          height: `${Math.min(size, 20)}px` 
                        }}
                      />
                    </div>
                    <span className="ml-2">{size}px</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <button
          onClick={handleEraserClick}
          className="btn btn-outline p-2"
          title="Eraser"
        >
          <Eraser className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex space-x-2">
        <div className="relative">
          <button
            onClick={() => setShowPromptInput(!showPromptInput)}
            className="btn btn-secondary p-2 flex items-center"
            title="AI Suggestions"
          >
            <Sparkles className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">AI Suggest</span>
          </button>
          
          {showPromptInput && (
            <div className="absolute top-full right-0 mt-2 z-20 bg-white rounded-md shadow-lg p-3 border border-gray-200 w-64">
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Describe what you want to create..."
                  className="input text-sm"
                />
                <button
                  onClick={handleAIPrompt}
                  className="btn btn-primary py-1 text-sm"
                >
                  Generate Suggestion
                </button>
              </div>
            </div>
          )}
        </div>
        
        <button
          onClick={handleSaveClick}
          className="btn btn-outline p-2"
          title="Save"
        >
          <Save className="h-5 w-5" />
        </button>
        
        <button
          onClick={handleDownloadClick}
          className="btn btn-outline p-2"
          title="Download"
        >
          <Download className="h-5 w-5" />
        </button>
        
        <button
          onClick={handleShareClick}
          className="btn btn-outline p-2"
          title="Share"
        >
          <Share2 className="h-5 w-5" />
        </button>
        
        <button
          onClick={handleClearCanvas}
          className="btn btn-outline p-2 text-red-500 hover:bg-red-50"
          title="Clear Canvas"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </>
  );
  
  return (
    <div className="bg-white border border-gray-200 rounded-md p-2 mb-4">
      <div className="hidden sm:flex sm:items-center sm:justify-between">
        {toolbarContent}
      </div>
      
      <div className="sm:hidden">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={handleColorClick}
              className="btn btn-outline p-2"
              title="Color"
            >
              <Palette className="h-5 w-5" />
            </button>
            <button
              onClick={handleBrushClick}
              className="btn btn-outline p-2"
              title="Brush Size"
            >
              <span className="font-medium">{currentWidth}px</span>
            </button>
            <button
              onClick={handleEraserClick}
              className="btn btn-outline p-2"
              title="Eraser"
            >
              <Eraser className="h-5 w-5" />
            </button>
          </div>
          
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="btn btn-outline p-2"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        
        {showMobileMenu && (
          <div className="absolute top-full left-0 right-0 mt-2 z-20 bg-white rounded-md shadow-lg p-3 border border-gray-200">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => setShowPromptInput(!showPromptInput)}
                className="btn btn-secondary p-2 flex items-center justify-center"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                AI Suggest
              </button>
              <button
                onClick={handleSaveClick}
                className="btn btn-outline p-2 flex items-center justify-center"
              >
                <Save className="h-5 w-5 mr-2" />
                Save
              </button>
              <button
                onClick={handleDownloadClick}
                className="btn btn-outline p-2 flex items-center justify-center"
              >
                <Download className="h-5 w-5 mr-2" />
                Download
              </button>
              <button
                onClick={handleShareClick}
                className="btn btn-outline p-2 flex items-center justify-center"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </button>
              <button
                onClick={handleClearCanvas}
                className="btn btn-outline p-2 flex items-center justify-center text-red-500"
              >
                <Trash2 className="h-5 w-5 mr-2" />
                Clear Canvas
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CanvasToolbar;