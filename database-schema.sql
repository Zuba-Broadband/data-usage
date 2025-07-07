-- Zuba Broadband Data Usage Management Database Schema

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create clients table
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create data_usage table
CREATE TABLE IF NOT EXISTS public.data_usage (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    kit_1_usage DECIMAL(10,2) DEFAULT 0.00, -- in GB
    kit_2_usage DECIMAL(10,2) DEFAULT 0.00, -- in GB
    total_usage DECIMAL(10,2) GENERATED ALWAYS AS (kit_1_usage + kit_2_usage) STORED,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(client_id, date)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_data_usage_client_id ON public.data_usage(client_id);
CREATE INDEX IF NOT EXISTS idx_data_usage_date ON public.data_usage(date);
CREATE INDEX IF NOT EXISTS idx_data_usage_client_date ON public.data_usage(client_id, date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_data_usage_updated_at BEFORE UPDATE ON public.data_usage
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_usage ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Enable read access for authenticated users" ON public.clients
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON public.clients
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON public.clients
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON public.clients
    FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON public.data_usage
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON public.data_usage
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON public.data_usage
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON public.data_usage
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO public.clients (name, email, phone, address) VALUES
('Bank of Kigali', 'it@bk.rw', '+250788123456', 'KG 5 Ave, Kigali'),
('Rwanda Development Board', 'info@rdb.rw', '+250788234567', 'Kimihurura, Kigali'),
('University of Rwanda', 'info@ur.ac.rw', '+250788345678', 'Gikondo, Kigali')
ON CONFLICT (email) DO NOTHING;

-- Insert sample data usage for Bank of Kigali (using the data from the CSV)
INSERT INTO public.data_usage (client_id, date, kit_1_usage, kit_2_usage) 
SELECT 
    (SELECT id FROM public.clients WHERE name = 'Bank of Kigali' LIMIT 1),
    date_val,
    kit1_val,
    kit2_val
FROM (VALUES
    ('2025-01-13', 0.0, 0.0),
    ('2025-01-21', 0.7, 0.0),
    ('2025-01-22', 5.8, 0.0),
    ('2025-01-23', 60.0, 0.0),
    ('2025-01-24', 26.0, 0.0),
    ('2025-01-25', 1.6, 0.0),
    ('2025-01-27', 61.0, 0.0),
    ('2025-01-28', 52.0, 0.0),
    ('2025-01-29', 49.0, 0.0),
    ('2025-01-30', 58.0, 0.0),
    ('2025-01-31', 31.0, 0.0),
    ('2025-02-04', 89.0, 0.0),
    ('2025-02-05', 61.0, 0.0),
    ('2025-02-06', 67.0, 0.0),
    ('2025-02-07', 59.0, 0.0),
    ('2025-02-09', 2.4, 0.0),
    ('2025-02-10', 101.0, 0.0),
    ('2025-02-11', 5.1, 1.1),
    ('2025-03-03', 7.4, 3.9),
    ('2025-03-04', 0.8, 0.0),
    ('2025-03-10', 0.2, 0.0),
    ('2025-03-11', 39.0, 29.0),
    ('2025-03-12', 50.0, 56.0),
    ('2025-06-18', 76.0, 77.0),
    ('2025-06-19', 107.0, 135.0),
    ('2025-06-20', 90.0, 91.0),
    ('2025-06-24', 56.0, 50.0),
    ('2025-06-25', 97.0, 82.0),
    ('2025-06-26', 142.0, 104.0),
    ('2025-06-27', 190.0, 0.0),
    ('2025-06-30', 188.0, 29.0)
) AS sample_data(date_val, kit1_val, kit2_val)
ON CONFLICT (client_id, date) DO NOTHING;

