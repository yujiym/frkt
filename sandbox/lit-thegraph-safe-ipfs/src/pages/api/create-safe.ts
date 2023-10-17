
type ResponseData = {
  safeSignerKey: string;
}

export default async function handler(req: any, res: any) {
  if (req.method == 'POST') {
    
    const safeSignerKey = process.env.SAFE_SIGNER_KEY!;
  
    const responseData: ResponseData = {
      safeSignerKey: safeSignerKey,
    }

    res.status(200).json(responseData);
  }
}