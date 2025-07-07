import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Filter, X } from 'lucide-react';
import { useState } from 'react'; // Import useState
import { Alert, AlertDescription } from './ui/alert'; // Import Alert

export const UsageFilters = ({ filters, setFilters, clients }) => {
  const [filterError, setFilterError] = useState(''); // State for filter errors

  const handleFilterChange = (key, value) => {
    setFilterError(''); // Clear previous errors
    // Basic validation for numeric inputs
    if ((key === 'minUsage' || key === 'maxUsage') && value !== '' && isNaN(parseFloat(value))) {
      setFilterError(`Invalid value for ${key}. Please enter a number.`);
      return;
    }
    if ((key === 'minUsage' || key === 'maxUsage') && parseFloat(value) < 0) {
        setFilterError(`${key} cannot be negative.`);
        return;
    }

    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      clientId: '',
      startDate: '',
      endDate: '',
      minUsage: '',
      maxUsage: ''
    });
    setFilterError(''); // Clear errors when clearing filters
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Advanced Filters
            </CardTitle>
            <CardDescription>
              Filter data usage records by client, date range, and usage amount
            </CardDescription>
          </div>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
        {filterError && ( // Display filter errors
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{filterError}</AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Client Filter */}
          <div className="space-y-2">
            <Label htmlFor="client-filter">Client</Label>
            <Select
              value={filters.clientId}
              onValueChange={(value) => handleFilterChange('clientId', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All clients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All clients</SelectItem>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Start Date Filter */}
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Input
              id="start-date"
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
            />
          </div>

          {/* End Date Filter */}
          <div className="space-y-2">
            <Label htmlFor="end-date">End Date</Label>
            <Input
              id="end-date"
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
            />
          </div>

          {/* Min Usage Filter */}
          <div className="space-y-2">
            <Label htmlFor="min-usage">Min Usage (GB)</Label>
            <Input
              id="min-usage"
              type="number"
              placeholder="0"
              min="0"
              step="0.1"
              value={filters.minUsage}
              onChange={(e) => handleFilterChange('minUsage', e.target.value)}
            />
          </div>

          {/* Max Usage Filter */}
          <div className="space-y-2">
            <Label htmlFor="max-usage">Max Usage (GB)</Label>
            <Input
              id="max-usage"
              type="number"
              placeholder="1000"
              min="0"
              step="0.1"
              value={filters.maxUsage}
              onChange={(e) => handleFilterChange('maxUsage', e.target.value)}
            />
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="text-sm font-medium mb-2">Active Filters:</div>
            <div className="flex flex-wrap gap-2">
              {filters.clientId && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary text-primary-foreground">
                  Client: {clients.find(c => c.id === filters.clientId)?.name}
                </span>
              )}
              {filters.startDate && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary text-primary-foreground">
                  From: {filters.startDate}
                </span>
              )}
              {filters.endDate && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary text-primary-foreground">
                  To: {filters.endDate}
                </span>
              )}
              {filters.minUsage && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary text-primary-foreground">
                  Min: {filters.minUsage} GB
                </span>
              )}
              {filters.maxUsage && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary text-primary-foreground">
                  Max: {filters.maxUsage} GB
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
