import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Minus, Plus, ShoppingCart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductCatalogProps {
  onSendToChat: (orderSummary: string) => void;
}

const mockProducts: Product[] = [
  { id: 1, name: "Product A", description: "High quality product with premium features", price: 29.99, image: "/placeholder.svg" },
  { id: 2, name: "Product B", description: "Affordable and reliable everyday item", price: 19.99, image: "/placeholder.svg" },
  { id: 3, name: "Product C", description: "Professional grade tool for experts", price: 49.99, image: "/placeholder.svg" },
  { id: 4, name: "Product D", description: "Compact and portable solution", price: 39.99, image: "/placeholder.svg" },
  { id: 5, name: "Product E", description: "Premium quality with extended warranty", price: 59.99, image: "/placeholder.svg" },
];

const ProductCatalog = ({ onSendToChat }: ProductCatalogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleQuantityChange = (productId: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + delta)
    }));
  };

  const selectedProducts = mockProducts.filter(p => quantities[p.id] > 0);
  const totalPrice = selectedProducts.reduce((sum, p) => sum + p.price * quantities[p.id], 0);

  const handleSendToChat = () => {
    if (selectedProducts.length === 0) return;

    let orderSummary = "🛒 Order Summary:\n\n";
    selectedProducts.forEach(product => {
      const qty = quantities[product.id];
      const itemTotal = product.price * qty;
      orderSummary += `${product.name}\nQuantity: ${qty}\nPrice: $${product.price.toFixed(2)}\nTotal: $${itemTotal.toFixed(2)}\n\n`;
    });
    orderSummary += `Total Price: $${totalPrice.toFixed(2)}`;

    onSendToChat(orderSummary);
    setQuantities({});
  };

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Search Bar */}
      <div className="p-3 md:p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background text-sm"
          />
        </div>
      </div>

      {/* Product List */}
      <ScrollArea className="flex-1 p-3 md:p-4">
        <div className="space-y-3">
          {filteredProducts.map(product => {
            const quantity = quantities[product.id] || 0;
            const itemTotal = product.price * quantity;

            return (
              <Card key={product.id} className="p-3 md:p-4">
                <div className="flex gap-3 md:gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md bg-muted"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm md:text-base text-foreground mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm md:text-base font-semibold text-foreground">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7 md:h-8 md:w-8"
                          onClick={() => handleQuantityChange(product.id, -1)}
                          disabled={quantity === 0}
                        >
                          <Minus className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7 md:h-8 md:w-8"
                          onClick={() => handleQuantityChange(product.id, 1)}
                        >
                          <Plus className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                      </div>
                    </div>
                    {quantity > 0 && (
                      <p className="text-xs md:text-sm text-muted-foreground mt-2">
                        Item Total: ${itemTotal.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>

      {/* Order Summary */}
      <div className="border-t border-border p-3 md:p-4 bg-muted/50">
        <div className="space-y-2 mb-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">Items Selected:</span>
            <span className="text-sm text-muted-foreground">{selectedProducts.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold text-foreground">Total Price:</span>
            <span className="text-base font-bold text-primary">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        <Button
          onClick={handleSendToChat}
          disabled={selectedProducts.length === 0}
          className="w-full"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Send to Chat
        </Button>
      </div>
    </div>
  );
};

export default ProductCatalog;
